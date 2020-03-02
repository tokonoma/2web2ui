import React from 'react';
import ProgressBar from '../ProgressBar.container.js';
import { mount } from 'enzyme';
import { HibanaProvider } from 'src/context/HibanaContext';

describe('ProgressBar', () => {
  const subject = (props, context) => {
    return mount(
      <HibanaProvider>
        <ProgressBar {...props} />
      </HibanaProvider>,
      context,
    );
  };
  it('should only pass pre-hibana when hibana is not enabled', () => {
    const props = { completed: 50, color: 'orange', size: 'normal', my: 50 };
    const instance = subject(<ProgressBar {...props} />, { isHibanaEnabled: false });
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).toHaveProperty('completed');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).toHaveProperty('color');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).not.toHaveProperty('size');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).not.toHaveProperty('my');
  });
});
