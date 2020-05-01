import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import styles from '../ListError.module.scss';

import ListError from '../ListError';

jest.mock('src/hooks/useHibanaOverride');

describe('ListError', () => {
  beforeEach(() => {
    useHibanaOverride.mockReturnValue(styles);
  });

  it('renders', () => {
    const wrapper = shallow(<ListError />);

    expect(wrapper).toExist();
  });
});
