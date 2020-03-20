import React from 'react';
import userEvent from '@testing-library/user-event';
import TestApp from 'src/__testHelpers__/TestApp';
import DeleteTemplateModal from '../DeleteTemplateModal';
import globalAlert from 'src/reducers/globalAlert';
import renderWithRedux from 'src/__testHelpers__/renderWithRedux';

jest.mock('src/components/globalAlert'); // Mocks `RedirectAndAlert` component

describe('DeleteTemplateModal', () => {
  const subject = props => {
    const initialState = {
      alerts: [],
      showBanner: true,
    };

    return renderWithRedux({
      reducer: globalAlert,
      initialState,
      component: (
        <TestApp>
          <DeleteTemplateModal
            open={true}
            template={{
              id: 'hello',
              subaccount_id: 'world',
            }}
            isLoading={false}
            {...props}
          />
        </TestApp>
      ),
    });
  };

  it('invokes "deleteTemplate" when clicking "Delete All Versions"', () => {
    const mockDeleteTemplate = jest.fn(() => Promise.resolve());

    const { getByText } = subject({ deleteTemplate: mockDeleteTemplate });

    userEvent.click(getByText('Delete All Versions'));

    expect(mockDeleteTemplate).toHaveBeenCalledWith({ id: 'hello', subaccountId: 'world' });
  });
});
