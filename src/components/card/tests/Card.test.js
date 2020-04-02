import React from 'react';
import { mount } from 'enzyme';
import { Card, CardContent, CardTitle } from '../Card';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Card', () => {
  it('should render a Card correctly', () => {
    const wrapper = mount(
      <TestApp>
        <Card />
      </TestApp>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render a CardContent correctly', () => {
    const wrapper = mount(
      <TestApp>
        <CardContent />
      </TestApp>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render a CardTitle correctly', () => {
    const wrapper = mount(
      <TestApp>
        <CardTitle />
      </TestApp>,
    );
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
