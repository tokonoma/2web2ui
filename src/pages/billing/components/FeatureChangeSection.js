import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { CheckCircle, Warning } from '@sparkpost/matchbox-icons';

import { Loading } from 'src/components/loading/Loading';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

import cx from 'classnames';
import styles from './FeatureChangeSection.module.scss';

const Feature = ({ key, value, label, description, action }) => (
  <Panel.Section key={`confirm_${key}`}>
    <div className={styles.Label}>{label}</div>
    <div className={styles.Feature}>
      <div className={styles.description}>
        {description}
      </div>
      <div>
        {
          value ? (
            <CheckCircle className={styles.FeatureCheckIcon}/>
          ) : action
        }
      </div>
    </div>
  </Panel.Section>
);

const FeatureChangeSection = () => {
  const { isReady, features, loading } = useFeatureChangeContext();

  if (loading) {
    return (
      <Panel sectioned style={{ minHeight: '200px' }}>
        <Loading />
      </Panel>
    );
  }

  const renderCTA = () => {
    const Icon = isReady ? CheckCircle : Warning;
    const description = isReady
      ? <>
        <strong>Your features have been updated</strong>
        <span>, please continue with your plan change.</span>
      </>
      : <>
        <span>Your new plan has additional limits on features you currently use. See the list below to </span>
        <strong>make the necessary changes before you can change plans.</strong>
      </>;
    return (
      <Panel.Section name='feature-change-status'>
        <div className={styles.FeatureListStatus}>
          <Icon className={cx(styles.FeatureListIcon, isReady ? styles.success : styles.danger)}/>
          <div name='status-description'>
            {description}
          </div>
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
