import React from 'react';
import { shallow } from 'enzyme';
import EditContents from '../EditContents';

describe('EditContents', () => {
  const subject = (props = {}) => shallow(
    <EditContents {...props} />
  );

  it('renders edit and preview sections', () => {
    expect(subject()).toMatchSnapshot();
  });
});
