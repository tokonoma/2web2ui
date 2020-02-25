import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { CheckCircle } from '@sparkpost/matchbox-icons';

import { Loading } from 'src/components/loading/Loading';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

import cx from 'classnames';
import styles from './FeatureChangeSection.module.scss';

const Feature = ({ key, value, label, description, action }) => (
  <Panel.Section key={`confirm_${key}`}>
    <div className={styles.Label}>{label}</div>
    <div className={styles.Feature}>
      <div className={styles.description}>{description}</div>
      <div>{value ? <CheckCircle className={styles.FeatureCheckIcon} /> : action}</div>
    </div>
  </Panel.Section>
);

const FeatureChangeSection = () => {
  const { features = [], loading } = useFeatureChangeContext();

  if (!features.length) {
    return null;
  }

  if (loading) {
    return (
      <Panel sectioned style={{ minHeight: '200px' }}>
        <Loading />
      </Panel>
    );
  }

  const renderCTA = () => (
    <Panel.Section name="feature-change-status">
      <div className={styles.FeatureListStatus}>
        <CheckCircle className={cx(styles.FeatureListIcon, styles.success)} />
        <div name="status-description">
          <strong>Your features have been updated</strong>
          <span>, please continue with your plan change.</span>
        </div>
      </div>
    </Panel.Section>
  );

  return (
    <Panel accent="green" title="Changes to Features">
      {renderCTA()}
      {features.map(Feature)}
    </Panel>
  );
};

export default FeatureChangeSection;
