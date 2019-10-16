import React from 'react';
import { mount } from 'enzyme';
import SavedIndicator from '../SavedIndicator';

describe('SavedIndicator', () => {
  it('renders with the content "Template Saved" when the `hasSaved` prop is `true`', () => {
    const wrapper = mount(<SavedIndicator hasSaved/>);

    expect(wrapper.text()).toBe('Template Saved');
  });

  it('renders with the content "Template has Unsaved Changes" when the `hasSaved` prop is `false`', () => {
    const wrapper = mount(<SavedIndicator hasSaved={false}/>);

    expect(wrapper.text()).toBe('Template has Unsaved Changes');
  });
});
