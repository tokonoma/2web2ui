import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import Tooltip from '../Tooltip';

import styles from '../Tooltip.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('renders tooltip correctly', () => {
  useHibanaOverride.mockImplementationOnce(() => styles);

  it('renders correctly icon', () => {
    expect(shallow(<Tooltip content="Here is content" />)).toMatchSnapshot();
  });
});
