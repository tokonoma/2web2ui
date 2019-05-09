import React from 'react';
import { shallow } from 'enzyme';
import EditAndPreviewPage from '../EditAndPreviewPage';

describe('EditAndPreviewPage', () => {
  const subject = (props = {}) => shallow(
    <EditAndPreviewPage
      {...props}
    />
  );

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });
});
