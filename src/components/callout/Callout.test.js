import React from 'react';
import { mount } from 'enzyme';
import Callout from './Callout';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Callout', () => {
  it('renders title', () => {
    const wrapper = mount(
      <TestApp>
        <Callout title="Example" />
      </TestApp>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders title and details', () => {
    const wrapper = mount(
      <TestApp>
        <Callout title="Example">Here is the deal...</Callout>
      </TestApp>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
