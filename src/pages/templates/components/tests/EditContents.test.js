import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import EditContents from '../EditContents';
import styles from '../EditContents.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('EditContents', () => {
  const subject = (props = {}) => {
    useHibanaOverride.mockImplementationOnce(() => styles);

    return shallow(<EditContents {...props} />);
  };

  it('renders edit and preview sections', () => {
    expect(subject()).toMatchSnapshot();
  });
});
