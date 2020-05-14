import { shallow } from 'enzyme';
import React from 'react';
import Divider from '../Divider';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('Signals Divider Component', () => {
  it('renders correctly', () => {
    expect(shallow(<Divider />)).toMatchSnapshot();
  });
});
