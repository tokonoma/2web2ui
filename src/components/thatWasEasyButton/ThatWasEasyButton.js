import React from 'react';
import classNames from 'classnames';
import styles from './ThatWasEasyButton.module.scss';

const ThatWasEasyButton = props => {
  const { onClick, className, isDisabled, isLoading, style } = props;

  return (
    <div style={style} className={classNames(styles.ThatWasEasyButton, className)}>
      <button
        onClick={onClick}
        className={classNames(
          styles.ThatWasEasyButtonButton,
          isDisabled && styles.isDisabled,
          isLoading && styles.isLoading,
        )}
        type="submit"
      >
        <span className={styles.ThatWasEasyButtonHighlight} role="presentation"></span>
        {isLoading ? (
          <div className={styles.ThatWasEasyButtonLoader} aria-label="loading">
            <span className={styles.ThatWasEasyButtonLoaderSub}></span>
          </div>
        ) : (
          <span className={styles.ThatWasEasyButtonContent}>send</span>
        )}
      </button>
    </div>
  );
};

export default ThatWasEasyButton;
