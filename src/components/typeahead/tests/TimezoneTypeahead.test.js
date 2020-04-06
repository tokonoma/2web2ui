import { mount } from 'enzyme';
import React from 'react';
import moment from 'moment';
import { TimezoneTypeahead } from '../TimezoneTypeahead';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Timezone Typeahead Item', () => {
  beforeEach(() => {
    moment.tz.setDefault('America/New_York');
  });
  // This includes a long list of options, but it's actually helpful to see a difference
  // when/if we update moment/moment-timezone which options might change
  it('should render the timezone list properly', () => {
    const wrapper = mount(
      <TestApp>
        <TimezoneTypeahead />
      </TestApp>,
    );
    expect(wrapper.find('Typeahead').prop('results')).toMatchSnapshot();
  });

  it('should should select the first timezone (UTC) as the default', () => {
    const wrapper = mount(
      <TestApp>
        <TimezoneTypeahead />
      </TestApp>,
    );
    expect(wrapper.find('Typeahead').prop('selectedItem')).toEqual({
      value: 'UTC',
      label: 'UTC',
    });
  });

  it('if initialValue is set, it should select that as the default', () => {
    const wrapper = mount(
      <TestApp>
        <TimezoneTypeahead initialValue="Pacific/Chatham" />
      </TestApp>,
    );

    expect(wrapper.find('Typeahead').prop('selectedItem')).toEqual({
      label: '(UTC+12:45) Pacific/Chatham',
      value: 'Pacific/Chatham',
    });
  });

  it('if isForcedUTC is set, it should set timezone to UTC in onChange ', () => {
    const onChange = jest.fn();
    mount(
      <TestApp>
        <TimezoneTypeahead initialValue="Pacific/Chatham" onChange={onChange} isForcedUTC={true} />
      </TestApp>,
    );

    expect(onChange).toBeCalledWith({
      label: 'UTC',
      value: 'UTC',
    });
  });

  it('if isForcedUTC is not set, it should not call the onChange', () => {
    const onChange = jest.fn();
    mount(
      <TestApp>
        <TimezoneTypeahead initialValue="Pacific/Chatham" onChange={onChange} isForcedUTC={false} />
      </TestApp>,
    );

    expect(onChange).not.toBeCalled();
  });
});
