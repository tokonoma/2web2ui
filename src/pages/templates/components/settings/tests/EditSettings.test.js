import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import EditSettings from '../EditSettings';
import styles from '../EditSettings.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('EditSettings', () => {
  it('renders form', () => {
    useHibanaOverride.mockImplementationOnce(() => styles);

    expect(shallow(<EditSettings />)).toMatchSnapshot();
  });
});
