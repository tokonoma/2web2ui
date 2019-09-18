import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { CheckCircle, Warning } from '@sparkpost/matchbox-icons';

import { useFeatureChangeContext } from '../context/FeatureChangeContext';

import cx from 'classnames';
import styles from './FeatureChangeSection.module.scss';

const Feature = ({ key, value, label, description, action }) => (
  <Panel.Section key={`confirm_${key}`}>
    <div className={styles.Label}>{label}</div>
    <div className={styles.Feature}>
      <div>
        {description}
      </div>
      <div>
        {
          value ? (
            <CheckCircle className={styles.FeatureCheckIcon}/>
          ) : action(key)
        }
      </div>
    </div>
  </Panel.Section>
);

const FeatureChangeSection = () => {
  const { isReady, features } = useFeatureChangeContext();

  const renderCTA = () => {
    const Icon = isReady ? CheckCircle : Warning;
    const description = isReady
      ? <div>
        <strong>Your features have been updated</strong>
        <span>, please continue with your plan change.</span>
      </div>
      : <div>
        <span>Your new plan has additional limits on features you currently use. See the list below to </span>
        <strong>make the necessary changes before you can change plans.</strong>
      </div>;
    return (
      <Panel.Section>
        <div className={styles.FeatureListStatus}>
          <Icon className={cx(styles.FeatureListIcon, isReady ? styles.success : styles.danger)}/>
          {description}
        </div>
      </Panel.Section>
    );
  };

  return (
    <Panel accent={isReady ? 'green' : 'red'} title='Changes to Features'>
      {renderCTA()}
      {features.map(Feature)}
    </Panel>
  );
};

export default FeatureChangeSection;
