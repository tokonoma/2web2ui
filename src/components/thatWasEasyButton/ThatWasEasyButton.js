import React from 'react';
import classNames from 'classnames';
import styles from './ThatWasEasyButton.module.scss';

const ThatWasEasyButton = props => {
  const { onClick, className, isDisabled, isLoading } = props;

  return (
    <div className={classNames(styles.ThatWasEasyButton, className)}>
      <button
        onClick={onClick}
        className={classNames(
          styles.ThatWasEasyButtonButton,
          isDisabled ? styles.isDisabled : null,
          isLoading ? styles.isLoading : null,
        )}
        type="submit"
      >
        <span className={styles.ThatWasEasyButtonHighlight} role="presentation"></span>
        {isLoading ? (
          <div className={styles.ThatWasEasyButtonLoader} aria-label="loading">
            <span className={styles.ThatWasEasyButtonLoaderSub}></span>
          </div>
        ) : (
          <span className={styles.ThatWasEasyButtonContent}>easy</span>
        )}
      </button>
    </div>
  );
};

export default ThatWasEasyButton;
