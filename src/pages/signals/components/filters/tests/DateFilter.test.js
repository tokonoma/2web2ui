import { mount } from 'enzyme';
import React from 'react';
import { DateFilter } from '../DateFilter';

describe('DateFilter', () => {
  let props;

  beforeEach(() => {
    props = {
      changeSignalOptions: jest.fn(),
      signalOptions: {},
      now: '2018-01-01T05:00:00Z'
    };
  });

  const subject = (options = {}) => mount(<DateFilter left {...props} {...options} />);

  it('renders datepicker', () => {
    expect(subject().find('AppDatePicker').props()).toMatchSnapshot();
  });

  it('sets default dates on mount', () => {
    subject();
    expect(props.changeSignalOptions).toHaveBeenCalledWith({
      relativeRange: '90days',
      from: new Date('2017-10-02T04:00:00.000Z'),
      to: new Date('2017-12-31T05:59:59.999Z')
    });
  });

  it('sets custom dates', () => {
    const wrapper = subject();
    const options = {
      relativeRange: 'custom',
      from: new Date('2015-01-04T05:00:00Z'),
      to: new Date('2015-01-09T05:00:00Z')
    };

    wrapper.find('AppDatePicker').prop('onChange')(options);
    expect(props.changeSignalOptions).toHaveBeenCalledWith(options);
  });
});
