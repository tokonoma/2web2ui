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
      {/*
        Conditionally rendering the buttons causes `react-day-picker` to behave unpredictably.
        Instead, always rendering the elements in the DOM but conditionally applying classes
        helps address the problem. Debugging further, it looks like the library unmounts the button
        before Matchbox checks as to whether the clicked button came from outside the popover node.
        As a result, the click registers as coming from outside the node as the popover no longer
        contains said element.
      */}
      <button
        className={classNames(
          styles.NavbarButton,
          styles.NavbarButtonPrev,
          !showPreviousButton && styles.isHidden,
        )}
        onClick={() => onPreviousClick()}
        data-id="date-selector-previous-month"
        type="button"
      >
        <ArrowBack size={21} className={styles.Prev} />

        <ScreenReaderOnly>Previous Month</ScreenReaderOnly>
      </button>

      <button
        className={classNames(
          styles.NavbarButton,
          styles.NavbarButtonNext,
          !showNextButton && styles.isHidden,
        )}
        onClick={() => onNextClick()}
        data-id="date-selector-next-month"
        type="button"
      >
        <ArrowForward size={21} className={styles.Next} />

        <ScreenReaderOnly>Next Month</ScreenReaderOnly>
      </button>
    </div>
  );
}
