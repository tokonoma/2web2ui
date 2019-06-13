import React from 'react';
import { shallow } from 'enzyme';
import DraftModeActions from '../DraftModeActions';

describe('DraftModeActions', () => {
  it('renders draft actions', () => {
    expect(shallow(<DraftModeActions/>)).toMatchSnapshot();
  });
});
