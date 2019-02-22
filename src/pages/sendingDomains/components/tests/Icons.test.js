import React from 'react';
import { shallow } from 'enzyme';

import { AutoVerifiedIcon, VerifiedIcon, ErrorIcon } from '../Icons';

describe('Sending Domains Icons', () => {
  it('renders auto verify icon', () => {
    expect(shallow(<AutoVerifiedIcon />)).toMatchSnapshot();
  });

  it('renders verify icon', () => {
    expect(shallow(<VerifiedIcon />)).toMatchSnapshot();
  });

  it('renders error icon', () => {
    expect(shallow(<ErrorIcon />)).toMatchSnapshot();
  });
});
