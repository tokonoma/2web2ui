import React from 'react';
import { shallow } from 'enzyme';
import UnverifiedBanner from '../UnverifiedBanner';

describe('Component: UnverifiedBanner', () => {
  const subject = (props) => shallow(<UnverifiedBanner cname='spgo.io' {...props} />);

  it('should render nothing with no unverified domains', () => {
    expect(subject({ unverifiedDomains: []})).toMatchSnapshot();
  });

  it('should render correctly with 1 unverified domain', () => {
    expect(subject({ unverifiedDomains: ['unverified.com']})).toMatchSnapshot();
  });

  it('should render correctly with more than 1 unverified domain', () => {
    expect(subject({ unverifiedDomains: [
      'unverified1.com',
      'unverified2.com'
    ]})).toMatchSnapshot();
  });

});
