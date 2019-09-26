import React from 'react';
import { mount } from 'enzyme';
import FocusContainer from '../FocusContainer';

describe('FocusContainer', () => {
  it('focuses on the element on mount', () => {
    /* eslint-disable no-unused-vars */
    const wrapper = mount(<FocusContainer id="foo"/>);
    /* eslint-enable no-unused-vars */

    expect(document.activeElement.id).toEqual('foo');
  });
});
