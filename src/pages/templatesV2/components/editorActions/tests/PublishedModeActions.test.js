import React from 'react';
import { shallow } from 'enzyme';
import PublishedModeActions from '../PublishedModeActions';

describe('PublishedModeActions', () => {
  it('renders published actions', () => {
    expect(shallow(<PublishedModeActions/>)).toMatchSnapshot();
  });
});
