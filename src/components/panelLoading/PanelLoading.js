import React from 'react';
import styles from './PanelLoading.module.scss';
import { Panel } from '@sparkpost/matchbox';
import { Loading } from 'src/components/loading/Loading';

const PanelLoading = (props) => {
  const { minHeight, accent } = props;

  return (
    <Panel
      className={styles.Loading}
      style={{ minHeight }}
      accent={accent}
    >
      <Loading />
    </Panel>
  );
};

PanelLoading.defaultProps = {
  minHeight: '400px',
  accent: false
};

export default PanelLoading;
