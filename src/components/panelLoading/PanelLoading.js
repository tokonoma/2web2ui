import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'src/components/matchbox';
import { Loading } from 'src/components/loading/Loading';
import styles from './PanelLoading.module.scss';

const PanelLoading = props => {
  const { minHeight, accent, title } = props;

  return (
    <Panel
      className={styles.Loading}
      style={{ minHeight }}
      accent={accent}
      data-id="panel-loading"
      title={title}
    >
      <Loading minHeight={minHeight} />
    </Panel>
  );
};

PanelLoading.propTypes = {
  minHeight: PropTypes.string,
  accent: PropTypes.bool,
};

PanelLoading.defaultProps = {
  minHeight: '400px',
  accent: false,
};

export default PanelLoading;
