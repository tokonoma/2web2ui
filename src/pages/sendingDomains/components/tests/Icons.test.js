import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { VerifiedIcon, ErrorIcon } from '../Icons';
import styles from '../Icons.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('Sending Domains Icons', () => {
  beforeEach(() => useHibanaOverride.mockImplementationOnce(() => styles));
  it('renders verify icon', () => {
    expect(shallow(<VerifiedIcon />)).toMatchSnapshot();
  });

  it('renders error icon', () => {
    expect(shallow(<ErrorIcon />)).toMatchSnapshot();
  });
});
