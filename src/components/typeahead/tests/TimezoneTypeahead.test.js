import { shallow } from 'enzyme';
import React from 'react';
import moment from 'moment';
import { TimezoneTypeahead } from '../TimezoneTypeahead';

describe('Timezone Typeahead Item', () => {
  // This includes a long list of options, but it's actually helpful to see a difference
  // when/if we update moment/moment-timezone which options might change
  it('should render the timezone list properly', () => {
    moment.tz.setDefault('America/New_York');
    expect(shallow(<TimezoneTypeahead />)).toMatchSnapshot();
  });
});
