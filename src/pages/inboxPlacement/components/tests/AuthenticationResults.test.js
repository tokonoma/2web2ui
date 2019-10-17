import React from 'react';
import { shallow } from 'enzyme';
import AuthenticationResults from '../AuthenticationResults';

describe('AuthenticationResults: ', () => {
  const subject = (props = {}) => shallow(
    <AuthenticationResults
      {...props}
    />
  );

  it('should render the section with data', () => {
    const wrapper = subject({
      data: {
        spf_pct: .3,
        dkim_pct: .4,
        dmarc_pct: .1
      }
    });
    expect(wrapper.find('PercentWheel[label="SPF"]').prop('value')).toEqual(.3);
    expect(wrapper.find('PercentWheel[label="DKIM"]').prop('value')).toEqual(.4);
    expect(wrapper.find('PercentWheel[label="DMARC"]').prop('value')).toEqual(.1);
  });
});
