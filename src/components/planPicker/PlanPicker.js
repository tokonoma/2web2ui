import React, { useMemo, useRef } from 'react';
import Downshift from 'downshift';
import { Field } from 'redux-form';
import cx from 'classnames';
import _ from 'lodash';
import { ExpandMore } from '@sparkpost/matchbox-icons';
import { PLAN_TIERS } from 'src/constants';
import { ExternalLink } from 'src/components/links';
import { Heading } from 'src/components/text';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import Plan from './Plan';
import OGStyles from './PlanPicker.module.scss';
import HibanaStyles from './PlanPickerHibana.module.scss';

const TIERS = [
  { key: 'default' },
  { key: 'test', label: PLAN_TIERS.test },
  { key: 'starter', label: PLAN_TIERS.starter },
  { key: 'premier', label: PLAN_TIERS.premier },
];

/**
 * This component will register the a redux-form field named 'planpicker'
 * Entire selected plan object is stored in state
 *
 * todo, this should be grouped with other redux-form wrappers
 */
export function PlanPicker({ bundles, input, selectedPromo }) {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);
  const inputRef = useRef(null);

  const handleOpen = () => {
    inputRef.current.focus();
  };

  const bundlesByTiers = useMemo(
    () =>
      _.groupBy(
        bundles.filter(x => x.status !== 'secret'),
        'tier',
      ),
    [bundles],
  );

  const planFn = ({
    getInputProps,
    getToggleButtonProps,
    getItemProps,
    isOpen,
    selectedItem,
    highlightedIndex,
  }) => {
    if (!selectedItem || _.isEmpty(bundlesByTiers)) {
      return null;
    }

    let index = 0;
    const items = [];

    TIERS.forEach(tier => {
      const tierPlans = bundlesByTiers[tier.key];
      if (tierPlans) {
        if (tier.label) {
          items.push(
            <li key={`label_${tier.key}`} className={styles.PlanPickerHeader}>
              <Heading as="h5">{tier.label}</Heading>
            </li>,
          );
        }

        bundlesByTiers[tier.key].forEach(item => {
          const classes = cx(
            styles.PlanPickerOption,
            selectedItem.bundle === item.bundle && styles.selected,
            highlightedIndex === index && styles.highlighted,
          );

          items.push(
            <li {...getItemProps({ item, index })} className={classes} key={index}>
              <Plan plan={item.messaging} />
            </li>,
          );

          index++;
        });
      }
    });

    return (
      <div className={styles.PlanPicker}>
        {PLAN_TIERS[selectedItem.tier] && (
          <Heading as="h5" className={styles.PlanPickerHeader}>
            {PLAN_TIERS[selectedItem.tier]}
          </Heading>
        )}
        <div>
          <button
            {...getToggleButtonProps({ onClick: handleOpen })}
            className={styles.PlanPickerTrigger}
            data-id="plan-picker-trigger"
          >
            <Plan plan={selectedItem.messaging} planPriceProps={{ selectedPromo }} />
            <ExpandMore size={32} />
          </button>
          <ol className={cx(styles.PlanPickerList, isOpen && styles.open)}>{items}</ol>
        </div>
        <p className={styles.PlanPickerHelpText}>
          <span>
            Interested in learning more about our Starter and Premier plans? Check out our
          </span>{' '}
          <ExternalLink to="https://www.sparkpost.com/docs/faq/difference-between-starter-and-premier">
            Knowledge Base
          </ExternalLink>
        </p>
        <input {...getInputProps()} ref={inputRef} readOnly type="hidden" />
      </div>
    );
  };

  const { onChange, value } = input;

  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item ? item.code : '')} // prevents the downshift console warning
      initialSelectedItem={
        value && value.bundle ? value : bundlesByTiers.default && bundlesByTiers.default[0]
      }
    >
      {planFn}
    </Downshift>
  );
}

// todo, Field shouldn't be shared, it should used in the form
export default ({ bundles = [], ...rest }) => (
  <Field component={PlanPicker} name="planpicker" bundles={bundles} {...rest} />
);
