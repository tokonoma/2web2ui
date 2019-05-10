import React from 'react';
import { shallow } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import EditAndPreviewPage from '../EditAndPreviewPage';

jest.mock('src/hooks/useRouter');

describe('EditAndPreviewPage', () => {
  const subject = (props = {}) => shallow(
    <EditAndPreviewPage
      {...props}
    />
  );

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      requestParams: {
        id: 'test-template-id'
      }
    }));
  });

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });
});
