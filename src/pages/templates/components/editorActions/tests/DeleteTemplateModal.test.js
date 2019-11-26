import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DeleteTemplateModal from '../DeleteTemplateModal';
import useEditorContext from '../../../hooks/useEditorContext';
import globalAlert from 'src/reducers/globalAlert';
import renderWithRedux from 'src/__testHelpers__/renderWithRedux';
jest.mock('../../../hooks/useEditorContext');
jest.mock('../../../../../../src/components/globalAlert'); // Mocks `RedirectAndAlert` component

describe('DeleteTemplateModal', () => {
  const subject = (editorContext) => {
    useEditorContext.mockReturnValue({
      isDeletePending: false,
      template: {
        id: 'hello',
        subaccount_id: 'world'
      },
      ...editorContext
    });
    const initialState = {
      alerts: [],
      showBanner: true
    };

    return renderWithRedux({
      reducer: globalAlert,
      initialState,
      component: (
        <Router>
          <DeleteTemplateModal/>
        </Router>
      )
    });
  };

  it('invokes "deleteTemplate" when clicking "Delete All Versions"', () => {
    const mockDeleteTemplate = jest.fn(() => Promise.resolve());

    const { getByText, debug } = subject({ deleteTemplate: mockDeleteTemplate });

    userEvent.click(getByText('Delete All Versions'));

    debug();

    expect(mockDeleteTemplate).toHaveBeenCalledWith({ id: 'hello', subaccountId: 'world' });
  });
});
