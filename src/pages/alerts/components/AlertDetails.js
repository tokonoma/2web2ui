import React from 'react';
import { Button, Panel, Tag } from '@sparkpost/matchbox';
import { METRICS, FILTERS_FRIENDLY_NAMES, SOURCE_FRIENDLY_NAMES, OPERATOR_FRIENDLY_NAMES } from '../constants/formConstants';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { MAILBOX_PROVIDERS } from 'src/constants';
import styles from './AlertDetails.module.scss';
import AlertToggle from './AlertToggle';
import { SlackIcon, WebhookIcon } from 'src/components/icons';
import { Link } from 'react-router-dom';
import { getEvaluatorOptions } from '../helpers/alertForm';

const extraChannels = [
  {
    key: 'slack',
    icon: SlackIcon,
    label: 'Slack'
  },
  {
    key: 'webhook',
    icon: WebhookIcon,
    label: 'Webhook'
  }
];

export const AlertDetails = ({ alert, id, subaccountIdToString, hasSubaccounts }) => {
  const { metric, channels = {}, filters = [], subaccounts = [], threshold_evaluator = {}, any_subaccount, muted } = alert;
  const { source, operator, value } = threshold_evaluator;

  const getSubaccountsTags = () => {
    if (any_subaccount) {
      return (
        <Tag className={styles.Tags}>Any Subaccount</Tag>
      );
    }
    const subaccountTags = subaccounts.map((subaccount) =>
      <Tag className={styles.Tags} key={subaccount}>{subaccountIdToString(subaccount)}</Tag>
    );
    return subaccountTags;
  };

  const getFilterValuesTags = (type, values) => {
    const valueTags = values.map((value) => {
      const formattedValue = (type === 'mailbox_provider') ? MAILBOX_PROVIDERS[value] : value;
      return (<Tag className={styles.Tags} key={`${type}-${value}`}>{formattedValue}</Tag>);
    });
    return valueTags;
  };

  const renderFilteredBy = () => {
    //Shows subaccounts filter if the account has subaccounts and if the subaccount value is not `Master and all`
    const shouldShowSubaccounts = hasSubaccounts && ((subaccounts.length > 0 && subaccounts[0] !== -1) || any_subaccount);
    const subaccount = shouldShowSubaccounts
      ? (
        <span key={'subaccounts'}>
          <h6 className={styles.BoldInline}>Subaccounts</h6> {getSubaccountsTags()}
        </span>
      )
      : undefined;

    //Only show 'and' if it's not the first filter or if there's a subaccounts filter
    const filtersTags = filters.map((filter, i) => (
      <span key={filter.filter_type}>
        {(shouldShowSubaccounts || i > 0) && 'and'} <h6 className={styles.BoldInline}>{FILTERS_FRIENDLY_NAMES[filter.filter_type]}</h6> {getFilterValuesTags(filter.filter_type, filter.filter_values)}
      </span>
    ));

    const renderedFilters = [subaccount, ...filtersTags].filter(Boolean);

    //If no subaccount or filters, do not show this row.
    if (renderedFilters.length === 0) {
      return undefined;
    }
    return renderedFilters;
  };

  const renderEvaluated = () => {
    const sourceTag = (metric === 'health_score') ? <Tag className={styles.FirstTag}>{SOURCE_FRIENDLY_NAMES[source]}</Tag> : '';
    const percentChangeText = (source === 'raw') ? '' : 'change ';
    const operatorText = (sourceTag) ? OPERATOR_FRIENDLY_NAMES[operator].toLowerCase() : OPERATOR_FRIENDLY_NAMES[operator];
    const { suffix } = getEvaluatorOptions(metric, source);
    const valueTag = <Tag className={styles.Tags}>{value}{suffix}</Tag>;
    return (<>
      {sourceTag}
      <h6 className={styles.BoldInline}>{percentChangeText}</h6>
      <h6 className={styles.BoldInline}>{operatorText}</h6>
      {valueTag}
      </>);
  };

  const renderNotify = () => {
    const { emails, ...restChannels } = channels;
    const visibleExtraChannels = extraChannels.filter(({ key }) => restChannels.hasOwnProperty(key));

    return (
      <>
        {emails && emails.length > 0 && (
          <div id='email'>
            <h6 className={styles.BoldInline}>Email</h6> {emails.map((email) => (
              <Tag key={email} className={styles.Tags}>
                <span className={styles.TagText}>{email}</span>
              </Tag>
            ))}
          </div>
        )}
        {visibleExtraChannels.map(({ icon: Icon, key, label }) => (
          <div key={key}>
            <h6 className={styles.BoldInline}>{label}</h6> <Tag className={styles.TagsWithIcon}>
              <Icon className={styles.Icon}/>
              <span className={styles.TagText}>{restChannels[key].target}</span>
            </Tag>
          </div>
        ))}
      </>
    );
  };

  const detailsMap = [
    { label: 'Metric:', render: (() => <h6>{METRICS[metric]}</h6>) },
    { label: 'Condition:', render: (() => (renderEvaluated())) },
    { label: 'Filtered By:', render: (() => (renderFilteredBy())) },
    { label: 'Notify:', render: (() => (renderNotify())) },
    { label: 'Mute:', render: (() => (<AlertToggle muted={muted} id={id} />)) }
  ];

  const renderAlertDetails = () =>
    detailsMap.map(({ label, render, bold }, i) => {
      const renderedValue = render();
      //Don't show rows with empty values (should only be applicable to filters)
      if (!renderedValue) {
        return null;
      }
      return (
        <Panel.Section key={i}>
          <LabelledValue label={label}>
            {renderedValue}
          </LabelledValue>
        </Panel.Section>);
    });

  return (
    <Panel>
      <Panel.Section >
        <h3 className={styles.Title}>Alert Details</h3>
        <Button component={Link} to={`/alerts/edit/${id}`} className={styles.Button} primary>Edit</Button>
      </Panel.Section>
      {renderAlertDetails()}
    </Panel>
  );
};
