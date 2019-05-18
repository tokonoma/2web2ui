import React from 'react';
import { shallow } from 'enzyme';
import PreviewErrorFrame from '../PreviewErrorFrame';

describe('PreviewErrorFrame', () => {
  const subject = (props = {}) => shallow(
    <PreviewErrorFrame {...props} />
  );

  it('renders error message', () => {
    expect(subject()).toMatchSnapshot();
  });
});
