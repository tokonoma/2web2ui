import React from 'react';
import classNames from 'classnames';
import styles from './ThatWasEasyButton.module.scss';

const ThatWasEasyButton = props => {
  const { onClick, className } = props;

  return (
    <div className={classNames(styles.ThatWasEasyButton, className)}>
      <button onClick={onClick} className={styles.ThatWasEasyButtonButton} type="submit">
        <span className={styles.ThatWasEasyButtonHighlight} role="presentation"></span>
        <span className={styles.ThatWasEasyButtonContent}>easy</span>
      </button>
    </div>
  );
};

export default ThatWasEasyButton;
