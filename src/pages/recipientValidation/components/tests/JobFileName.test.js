import React from 'react';
import { shallow } from 'enzyme';
import JobFileName from '../JobFileName';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import styles from '../JobFileName.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('JobFileName', () => {
  beforeEach(() => {
    useHibanaOverride.mockReturnValue(styles);
  });

  const subject = (props = {}) => shallow(<JobFileName {...props} />);

  it('renders the empty state when no value for the `filename` prop is provided', () => {
    expect(subject().text()).toEqual('File name not available');
  });

  it('renders the filename when a value is passed via the `filename` prop', () => {
    const wrapper = subject({ filename: 'foobar' });

    expect(wrapper.text()).toEqual('foobar');
  });
});
