import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';

describe('Editor', () => {
  const subject = (props = {}) => shallow(
    <Editor {...props} />
  );

  it('renders editor', () => {
    expect(subject({ value: 'Example' })).toMatchSnapshot();
  });

  it('sets null value to empty string', () => {
    const wrapper = subject({ mode: 'html', value: null });
    expect(wrapper.find('ReactAce')).toHaveProp('value', '');
  });
});
