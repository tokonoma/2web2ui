import React from 'react';
import { shallow } from 'enzyme';

import { SuccessIcon, WarningIcon, InfoIcon, ErrorIcon } from '../Icons';

describe('Sending Domains Icons', () => {
  it('renders success icon', () => {
    expect(shallow(<SuccessIcon />)).toMatchSnapshot();
  });

  it('renders error icon', () => {
    expect(shallow(<ErrorIcon />)).toMatchSnapshot();
  });

  it('renders info icon', () => {
    expect(shallow(<InfoIcon />)).toMatchSnapshot();
  });

  it('renders warning icon', () => {
    expect(shallow(<WarningIcon />)).toMatchSnapshot();
  });
});
