import React from 'react';
import { shallow } from 'enzyme';
import ListError from '../ListError';

describe('ListError', () => {
  it('renders', () => {
    const wrapper = shallow(<ListError/>);

    expect(wrapper).toExist();
  });
});
