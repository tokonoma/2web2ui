import { shallow } from 'enzyme';
import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import BackupCodesList from '../BackupCodesList';
import styles from '../BackupCodesList.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('Component: BackupCodesList', () => {
  beforeEach(() => useHibanaOverride.mockReturnValue(styles));

  it('should render correctly', () => {
    const props = {
      codes: ['code1', 'code2', 'code3'],
    };
    const wrapper = shallow(<BackupCodesList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
