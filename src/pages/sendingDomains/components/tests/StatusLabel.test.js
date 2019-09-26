import React from 'react';
import { shallow } from 'enzyme';
import StatusLabel from '../StatusLabel';

describe('StatusLabel', () => {
  const subject = (props = {}) => shallow(
    <StatusLabel status="unverified" {...props} />
  );

  it('renders status tag', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders verified label', () => {
    expect(subject({ status: 'verified' })).toMatchSnapshot();
  });
});
