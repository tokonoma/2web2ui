import React, { useState, useEffect } from 'react';
import { roundToPlaces } from 'src/helpers/units';
import { lerp } from 'src/helpers/math';
import thresholds from '../../../constants/healthScoreThresholds';

import styles from './CurrentHealthGauge.module.scss';

function Gauge({ score = 0, threshold = {} }) {
  // Mounts this component initially with 0
  // then animates to its provided score
  const [rotation, setRotation] = useState(`rotate(${lerp(-205, 27, 0)}deg)`);

  useEffect(() => {
    setRotation(`rotate(${lerp(-205, 27, score / 100)}deg)`);
  }, [score]);

  return (
    <div className={styles.GaugeSvgContainer} data-id="health-score-gauge">
      <svg width="100%" height={210} viewBox="0 0 100 100">
        <path
          className={styles.Red}
          fill={thresholds.danger.color}
          d="M14.4 82.9c-1.1 0-2.1-.6-2.7-1.6-3.3-6.3-5-13.4-5-20.6 0-24.3 19.7-44 44-44 2.6 0 5.3.2 7.8.7-.3 1.7-.2 1.2-.5 2.8-.3 1.6-.4 2.2-.6 3.1-2.2-.4-4.5-.6-6.7-.6-21 0-38 17-38 38 0 6.2 1.5 12.4 4.4 17.8.8 1.5.2 3.3-1.2 4.1-.5.2-1 .3-1.5.3z"
        />
        <path
          className={styles.Yellow}
          fill={thresholds.warning.color}
          d="M58.3 17.3c16.2 2.8 29.2 14 34.2 29.7-.3.1-2 .8-2.8 1.1l-2.8 1.1c-4.3-13.6-15.7-23.6-29.7-26.1l1.1-5.8z"
        />
        <path
          className={styles.Green}
          fill={thresholds.good.color}
          d="M92.5 47.1c1.4 4.3 2.1 9.1 2.1 13.6 0 7.2-1.8 14.3-5.1 20.6-.5 1-1.6 1.6-2.7 1.6-.5 0-1-.1-1.4-.3-1.5-.8-2-2.6-1.2-4.1 2.9-5.4 4.4-11.6 4.4-17.7 0-3.9-.6-7.8-1.8-11.5l5.7-2.2z"
        />
        <text className={styles.Text} x={56} y={14}>
          55
        </text>
        <text className={styles.Text} x={95} y={47}>
          80
        </text>
        <line
          x1="63"
          y1="58"
          x2="85"
          y2="50"
          className={styles.Tick}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="53"
          y1="50"
          x2="57"
          y2="25"
          className={styles.Tick}
          vectorEffect="non-scaling-stroke"
        />
        <path
          className={styles.Needle}
          style={{ transform: rotation }}
          data-id="health-score-gauge-needle"
          d="M78.4 63S51.5 61.2 50 61.2s-2.8 1.3-2.8 2.8c0 1.5 1.3 2.8 2.8 2.8S78.4 63 78.4 63z"
        />
      </svg>
      <h4 className={styles.Score} style={{ color: threshold.color }} data-id="health-score">
        {roundToPlaces(score, 1).toFixed(1)}
      </h4>
    </div>
  );
}

export default Gauge;
