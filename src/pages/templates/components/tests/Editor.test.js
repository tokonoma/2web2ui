import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../Editor';

describe('Editor', () => {
  const subject = (props = {}) => shallow(
    <Editor {...props} />
  );

  it('renders editor', () => {
    expect(subject({ mode: 'html', value: '<h1>Example</h1>' })).toMatchSnapshot();
  });
});
