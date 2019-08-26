import React from 'react';
import { shallow } from 'enzyme';
import JobAddressCount from '../JobAddressCount';

describe('JobAddressCount', () => {
  const subject = (props = {}) => shallow(
    <JobAddressCount {...props} />
  );

  it('renders formatted count', () => {
    expect(subject({ count: 1234, status: 'success' })).toHaveProp('children', '1,234');
  });

  it('renders null when not ready', () => {
    expect(subject({ status: 'error' })).toBeEmptyRender();
  });
});
