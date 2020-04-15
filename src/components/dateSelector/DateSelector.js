import React from 'react';
import classNames from 'classnames';
import DayPicker, { DateUtils } from 'react-day-picker';
import { ArrowForward, ArrowBack } from '@sparkpost/matchbox-icons';
import { ScreenReaderOnly } from 'src/components/matchbox';
import OGStyles from './DateSelector.module.scss';
import hibanaStyles from './DateSelectorHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

function DateSelector({ selectedDays, ...props }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const modifiers = selectedDays
    ? {
        [styles.firstSelected]: day => DateUtils.isSameDay(day, selectedDays.from),
        [styles.lastSelected]: day => DateUtils.isSameDay(day, selectedDays.to),
        [styles.inBetween]: day => DateUtils.isDayBetween(day, selectedDays.from, selectedDays.to),
      }
    : {};

  return <DayPicker modifiers={modifiers} classNames={styles} navbarElement={Navbar} {...props} />;
}

export default DateSelector;

export function Navbar(props) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const { onPreviousClick, onNextClick, showNextButton, showPreviousButton } = props;

  return (
    <div className={styles.Navbar}>
      {showPreviousButton && (
        <button
          className={classNames(styles.NavbarButton, styles.NavbarButtonPrev)}
          onClick={() => onPreviousClick()}
          data-id="date-selector-previous-month"
        >
          <ArrowBack size={21} className={styles.Prev} />

          <ScreenReaderOnly>Previous Month</ScreenReaderOnly>
        </button>
      )}

      {showNextButton && (
        <button
          className={classNames(styles.NavbarButton, styles.NavbarButtonNext)}
          onClick={() => onNextClick()}
          data-id="date-selector-next-month"
        >
          <ArrowForward size={21} className={styles.Next} />

          <ScreenReaderOnly>Next Month</ScreenReaderOnly>
        </button>
      )}
    </div>
  );
}
