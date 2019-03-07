import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'src/helpers/date';
import styles from './Tooltip.module.scss';
import _ from 'lodash';
import './Tooltip.scss';

// HOOKS PLEASE
class Tooltip extends Component {
  state = { left: 0, top: 0, isRight: true }

  constructor(props) {
    super(props);
    this.wrapper = createRef();
  }

  setPosition() {
    const { coordinate, offset } = this.props;
    const { left, width, height } = this.wrapper.current.getBoundingClientRect();
    const { isRight } = this.state;

    // Find a consistent point to evaluate against window width
    const xTarget = isRight ? left - offset : left + width + offset;
    const newIsRight = xTarget + width + offset < window.innerWidth;

    const coords = {
      top: coordinate.y - (height / 2),
      left: newIsRight ? coordinate.x + offset : (coordinate.x - offset) - width,
      isRight: newIsRight
    };

    this.setState(coords);
  }

  componentDidUpdate({ coordinate: prevCoords }) {
    const { coordinate } = this.props;

    if (coordinate.x !== prevCoords.x || coordinate.y !== prevCoords.y) {
      this.setPosition();
    }
  }

  render() {
    const { children, width } = this.props;
    const { left, top } = this.state;
    const content = _.get(this.props, 'payload[0]', {});
    const date = _.get(content, 'payload.date');

    return (
      <div
        className={styles.TooltipWrapper}
        ref={this.wrapper}
        style={{ width, left, top }}
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
