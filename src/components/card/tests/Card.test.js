import React from 'react';
import { shallow } from 'enzyme';
import { Card, CardContent, CardTitle } from '../Card';

describe('Card', () => {
  it('should render a Card correctly', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render a CardContent correctly', () => {
    const wrapper = shallow(<CardContent />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render a CardTitle correctly', () => {
    const wrapper = shallow(<CardTitle />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});

