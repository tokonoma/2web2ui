import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import PublishedModeActions from '../PublishedModeActions';

jest.mock('../../../hooks/useEditorContext');

describe('PublishedModeActions', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      hasDraft: true,
      template: {
        id: 'a-random-id-123',
        subaccount_id: 'some-subaccount-id'
      },
      ...editorState
    });

    return shallow(<PublishedModeActions />);
  };

  it('renders published actions', () => {
    expect(subject({ published: { id: '123', subaccount_id: 'abcd' }})).toMatchSnapshot();
  });

  describe('the DuplicateTemplateModal', () => {
    const wrapper = subject();

    it('sets the `open` prop to `true` and closes the popover when clicking on `DuplicateTemplate`', () => {
      wrapper.find('DuplicateTemplate').simulate('click');

      expect(wrapper.find('DuplicateTemplateModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('sets the `open` prop to `false` when invoking the `onClose` prop', () => {
      wrapper.find('DuplicateTemplate').simulate('click');
      wrapper.find('DuplicateTemplateModal').prop('onClose')();

      expect(wrapper.find('DuplicateTemplateModal')).toHaveProp('open', false);
    });
  });

  describe('the DeleteTemplateModal', () => {
    const wrapper = subject();

    it('sets the `open` prop to `true` and closes the popover when clicking on `DeleteTemplate`', () => {
      wrapper.find('DeleteTemplate').simulate('click');

      expect(wrapper.find('DeleteTemplateModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('sets the `open` prop to `false` when invoking the `onClose` prop', () => {
      wrapper.find('DeleteTemplate').simulate('click');
      wrapper.find('DeleteTemplateModal').prop('onClose')();

      expect(wrapper.find('DeleteTemplateModal')).toHaveProp('open', false);
    });
  });
});
