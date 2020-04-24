import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import Fullscreen from '../Fullscreen';
import styles from '../Layout.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('Fullscreen', () => {
  it('renders children in fullscreen layout', () => {
    useHibanaOverride.mockImplementationOnce(() => styles);

    const wrapper = shallow(<Fullscreen children={<div>My Page</div>} />);

    expect(wrapper).toMatchSnapshot();
  });
});
