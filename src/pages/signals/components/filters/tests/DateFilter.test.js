import { mount } from 'enzyme';
import React from 'react';
import { DateFilter } from '../DateFilter';
import { roundBoundaries } from 'src/helpers/metrics';
import moment from 'moment';
import TestApp from 'src/__testHelpers__/TestApp';

describe('DateFilter', () => {
  let props;

  beforeEach(() => {
    props = {
      changeSignalOptions: jest.fn(),
      signalOptions: {},
      now: '2018-01-01T05:00:00Z',
    };
  });

  const subject = (options = {}) =>
    mount(
      <TestApp>
        <DateFilter left {...props} {...options} />
      </TestApp>,
    );

  it('renders datepicker', () => {
    expect(
      subject()
        .find('DatePicker')
        .props(),
    ).toMatchSnapshot();
  });

  it('sets a relative range', () => {
    const wrapper = subject();
    const options = { relativeRange: '90days' };
    const { from, to } = roundBoundaries({
      from: moment('2017-10-02T04:00:00Z'),
      to: moment('2017-12-31T05:59:59.999Z'),
    });

    wrapper.find('DatePicker').prop('onChange')(options);
    expect(props.changeSignalOptions).toHaveBeenCalledWith({
      ...options,
      from: from.toDate(),
      to: to.toDate(),
    });
  });

  it('sets custom dates', () => {
    const wrapper = subject();
    const options = {
      relativeRange: 'custom',
      from: new Date('2015-01-04T05:00:00Z'),
      to: new Date('2015-01-09T05:00:00Z'),
    };

    wrapper.find('DatePicker').prop('onChange')(options);
    expect(props.changeSignalOptions).toHaveBeenCalledWith(options);
  });
});
