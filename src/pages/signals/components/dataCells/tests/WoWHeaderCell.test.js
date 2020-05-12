import React from 'react';
import { shallow } from 'enzyme';
import WoWHeaderCell from '../WoWHeaderCell';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('WoWHeaderCell', () => {
  it('renders', () => {
    expect(shallow(<WoWHeaderCell />)).toMatchSnapshot();
  });
});
