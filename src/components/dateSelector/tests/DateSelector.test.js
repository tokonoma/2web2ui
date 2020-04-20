import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import DateSelector, { Navbar } from '../DateSelector';
import styles from '../DateSelector.module.scss';
import * as DayPicker from 'react-day-picker';
import moment from 'moment';

jest.mock('src/hooks/useHibanaOverride');
jest.mock('react-day-picker');

describe('DateSelector', () => {
  let wrapper;

  beforeEach(() => {
    useHibanaOverride.mockImplementationOnce(() => styles);
    const testDate = moment('2018-05-20').toDate();
    DayPicker.DateUtils.isSameDay = jest.fn();
    DayPicker.DateUtils.isDayBetween = jest.fn();
    wrapper = shallow(
      <DateSelector initialMonth={testDate} selectedDays={{ from: 1, to: 1000 }} />,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should compare first selected day against isSameDay', () => {
    wrapper.prop('modifiers').firstSelected(123);
    expect(DayPicker.DateUtils.isSameDay).toHaveBeenCalledWith(123, 1);
  });

  it('should compare last selected day against isSameDay', () => {
    wrapper.prop('modifiers').lastSelected(123);
    expect(DayPicker.DateUtils.isSameDay).toHaveBeenCalledWith(123, 1000);
  });

  it('should compare in between days against isDayBetween', () => {
    wrapper.prop('modifiers').inBetween(123);
    expect(DayPicker.DateUtils.isDayBetween).toHaveBeenCalledWith(123, 1, 1000);
  });
});

describe('Navbar', () => {
  beforeEach(() => {
    useHibanaOverride.mockImplementationOnce(() => styles);
  });

  it('should render correctly', () => {
    expect(shallow(<Navbar showNextButton showPreviousButton />)).toMatchSnapshot();
  });

  it('should call previous button handler', () => {
    const handlePreviousClick = jest.fn();
    const wrapper = shallow(<Navbar showPreviousButton onPreviousClick={handlePreviousClick} />);

    wrapper.find('[data-id="date-selector-previous-month"]').simulate('click');
    expect(handlePreviousClick).toHaveBeenCalled();
  });

  it('should call next button handler', () => {
    const handleNextClick = jest.fn();
    const wrapper = shallow(<Navbar showNextButton onNextClick={handleNextClick} />);

    wrapper.find('[data-id="date-selector-next-month"]').simulate('click');
    expect(handleNextClick).toHaveBeenCalled();
  });

  it('renders the next and previous buttons without the `isHidden` styles when controlled via the `showNextButton` and `showPreviousButton` props', () => {
    const wrapper = shallow(<Navbar showNextButton showPreviousButton />);

    expect(wrapper).toHaveTextContent('Previous Month');
    expect(wrapper).toHaveTextContent('Next Month');
    expect(wrapper.find('.isHidden')).not.toExist();
  });

  it('should render the previous button with the `isHidden` styles when `showPreviousButton` is `false`', () => {
    const wrapper = shallow(<Navbar showPreviousButton={false} showNextButton />);

    expect(wrapper.find('[data-id="date-selector-previous-month"]')).toHaveClassName('isHidden');
    expect(wrapper.find('[data-id="date-selector-next-month"]')).not.toHaveClassName('isHidden');
  });

  it('should render the next button with the `isHidden` styles when `showNextButton` is `false`', () => {
    const wrapper = shallow(<Navbar showPreviousButton showNextButton={false} />);

    expect(wrapper.find('[data-id="date-selector-previous-month"]')).not.toHaveClassName(
      'isHidden',
    );
    expect(wrapper.find('[data-id="date-selector-next-month"]')).toHaveClassName('isHidden');
  });
});
