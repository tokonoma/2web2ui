import React from 'react';
import { shallow } from 'enzyme';

import { VerifiedIcon, ErrorIcon } from '../Icons';

describe('Sending Domains Icons', () => {
  it('renders verify icon', () => {
    expect(shallow(<VerifiedIcon />)).toMatchSnapshot();
  });

  it('renders error icon', () => {
    expect(shallow(<ErrorIcon />)).toMatchSnapshot();
  });
});
