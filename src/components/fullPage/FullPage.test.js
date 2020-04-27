import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import FullPage from './FullPage';
import styles from '../FullPage.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('FullPage', () => {
  const subject = (props = {}) => {
    useHibanaOverride.mockImplementationOnce(() => styles);

    return shallow(
      <FullPage
        breadcrumbRedirectsTo="/here"
        primaryArea={<button>Click Me</button>}
        title="Test Example"
        {...props}
      >
        <div>children</div>
      </FullPage>,
    );
  };

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });
});
