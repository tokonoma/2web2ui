import React from 'react';
import PropTypes from 'prop-types';
import styles from './LineBreak.module.scss';

const LineBreak = ({ align = 'center', text }) => {
  if (!text) {
    return <hr className={styles.textless}/>;
  }

  return (
    <div className={styles[align]}>
      <div><hr /></div>
      <span>{text}</span>
      <div><hr /></div>
    </div>
  );
};

LineBreak.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  text: PropTypes.string
};

export default LineBreak;
