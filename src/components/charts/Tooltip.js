import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'src/helpers/date';
import { getBoundingClientRect } from 'src/helpers/geometry';
import styles from './Tooltip.module.scss';
import _ from 'lodash';
import './Tooltip.scss';

function Tooltip(props) {
  const { coordinate, children, offset, width } = props;
  const content = _.get(props, 'payload[0]', {});
  const date = _.get(content, 'payload.date');
  const wrapper = useRef(null);

  const [positionedOnRight, setPositionedOnRight] = useState(true);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  // Calculates Tooltip position
  useLayoutEffect(() => {
    const rect = getBoundingClientRect(wrapper);

    // Find a consistent point to evaluate against window width
    const xTarget = positionedOnRight ? rect.left - offset : rect.left + rect.width + offset;
    const newPositionedOnRight = xTarget + rect.width + offset < window.innerWidth;

    const coords = {
      top: coordinate.y - (rect.height / 2),
      left: newPositionedOnRight ? coordinate.x + offset : (coordinate.x - offset) - rect.width
    };

    setPosition(coords);
    setPositionedOnRight(newPositionedOnRight);
  }, [coordinate.x, coordinate.y, offset, positionedOnRight, wrapper]);

  return (
    <div
      className={styles.TooltipWrapper}
      ref={wrapper}
      style={{ width, ...position }}
    >
      {date && (
        <div className={styles.TooltipDate}>
          {formatDate(date)}
        </div>
      )}
      <div className={styles.TooltipContent}>
        {children(content)}
      </div>
    </div>
  );
}


const defaultChildren = ({ value }) => value;

Tooltip.propTypes = {
  children: PropTypes.func,
  width: PropTypes.string,
  offset: PropTypes.number
};

Tooltip.defaultProps = {
  children: defaultChildren,
  width: '200px',
  offset: 25
};

export default Tooltip;
