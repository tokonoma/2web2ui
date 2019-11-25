import React from 'react';
import { shallow } from 'enzyme';
import DeleteTemplateModal from '../DeleteTemplateModal';
import useEditorContext from '../../../hooks/useEditorContext';
jest.mock('../../../hooks/useEditorContext');

describe('DeleteTemplateModal', () => {
  it('invokes "deleteTemplate" when deleting', () => {
    const mockDeleteTemplate = jest.fn(() => Promise.resolve());
    const subject = () => {
      useEditorContext.mockReturnValue({
        isDeletePending: false,
        deleteTemplate: mockDeleteTemplate,
        template: {
          id: 'hello',
          subaccount_id: 'world'
        }
      });
      return shallow(<DeleteTemplateModal />);
    };

    subject().find('DeleteModal').simulate('delete');

    expect(mockDeleteTemplate).toHaveBeenCalledWith({ id: 'hello', subaccountId: 'world' });
  });
});
