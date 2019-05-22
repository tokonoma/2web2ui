import React from 'react';
import { shallow } from 'enzyme';
import FullPage from './FullPage';

describe('FullPage', () => {
  const subject = (props = {}) => shallow(
    <FullPage
      breadcrumbRedirectsTo="/here"
      primaryArea={<button>Click Me</button>}
      title="Test Example"
      {...props}
    >
      <div>children</div>
    </FullPage>
  );

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });
});
