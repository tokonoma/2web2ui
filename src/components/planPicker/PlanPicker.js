import React, { useMemo, useRef } from 'react';
import Downshift from 'downshift';
import { Field } from 'redux-form';
import cx from 'classnames';
import _ from 'lodash';
import { PLAN_TIERS } from 'src/constants';
import { ExternalLink } from 'src/components/links';
import { ExpandMore } from '@sparkpost/matchbox-icons';
import Plan from './Plan';
import styles from './PlanPicker.module.scss';

const TIERS = [
  { key: 'default' },
  { key: 'test', label: PLAN_TIERS.test },
  { key: 'starter', label: PLAN_TIERS.starter },
  { key: 'premier', label: PLAN_TIERS.premier },
];

/**
 * This component will register the a redux-form field named 'planpicker'
 * Entire selected plan object is stored in state
 */
export function PlanPicker({ bundles, input, disabled, selectedPromo }) {
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
            <div key={`label_${tier.key}`} className={cx(styles.DropdownLabel)}>
              {tier.label}:
            </div>,
          );
        }

        bundlesByTiers[tier.key].forEach(item => {
          const classes = cx(
            styles.DropdownPlan,
            selectedItem.bundle === item.bundle && styles.selected,
            highlightedIndex === index && styles.highlighted,
          );
          items.push(
            <Plan
              key={index}
              className={classes}
              {...getItemProps({ item, index, plan: item.messaging })}
            />,
          );
          index++;
        });
      }
    });

    const listClasses = cx(styles.List, isOpen && styles.open);
    const triggerClasses = cx(
      styles.TriggerPlan,
      disabled && styles.disabled,
      isOpen && styles.triggerOpen,
    );

    const triggerProps = getToggleButtonProps({
      plan: selectedItem.messaging,
      onClick: handleOpen,
    });
    const planPriceProps = {
      selectedPromo,
    };

    return (
      <div className={styles.PlanPicker}>
        <div {...triggerProps} className={cx(styles.TriggerHeader)}>
          <span>Select A Plan</span>
          <ExpandMore size={24} className={styles.Chevron} />
        </div>
        <div className={cx(styles.PlanContainer)}>
          {PLAN_TIERS[selectedItem.tier] && (
            <div className={cx(styles.DropdownLabel)}>{PLAN_TIERS[selectedItem.tier]}</div>
          )}
          <Plan {...triggerProps} className={triggerClasses} planPriceProps={planPriceProps} />
          <input {...getInputProps()} ref={inputRef} className={styles.Input} readOnly />
          <div className={listClasses}>{items}</div>
        </div>
        <div className={cx(styles.TierPlansInfo)}>
          <span>
            Interested in learning more about our Starter and Premier plans? Check out our{' '}
          </span>
          <ExternalLink to="https://www.sparkpost.com/docs/faq/difference-between-starter-and-premier">
            Knowledge Base
          </ExternalLink>
        </div>
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

export default ({ bundles = [], ...rest }) => (
  <Field component={PlanPicker} name="planpicker" bundles={bundles} {...rest} />
);
