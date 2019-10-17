import React from 'react';
import styles from './HealthScoreLegend.module.scss';
import { HEALTH_SCORE_COLORS_V3 } from '../constants/healthScoreThresholds';

function HealthScoreLegend() {
  return (
    <div className={styles.Legend}>
      <div className={styles.danger} style={{ background: HEALTH_SCORE_COLORS_V3.danger }}>
        <div className={styles.Desc}>0-55 Bad</div>
      </div>
      <div className={styles.warning} style={{ background: HEALTH_SCORE_COLORS_V3.warning }}>
        <div className={styles.Desc}>55-80 Warning</div>
      </div>
      <div className={styles.good} style={{ background: HEALTH_SCORE_COLORS_V3.good }}>
        <div className={styles.Desc}>80+ Good</div>
      </div>
    </div>
  );
}

export default HealthScoreLegend;
