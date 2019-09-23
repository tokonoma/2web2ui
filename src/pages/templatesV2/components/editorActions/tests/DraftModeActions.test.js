import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import DraftModeActions from '../DraftModeActions';

jest.mock('../../../hooks/useEditorContext');

describe('DraftModeActions', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      hasPublished: true,
      ...editorState
    });

    return shallow(<DraftModeActions />);
  };

  it('renders draft actions', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('does not render ViewPublished when hasPublished is false ', () => {
    expect(subject({ hasPublished: false }).find('ViewPublished')).not.toExist();
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

  describe('the SaveAndPublishConfirmationModal', () => {
    const wrapper = subject();

    it('sets the `open` prop to `true` and closes the popover when clicking on `SaveAndPublish`', () => {
      wrapper.find('SaveAndPublish').first().simulate('click');

      expect(wrapper.find('SaveAndPublishConfirmationModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('sets the `open` prop to `false` when invoking the `onCancel` prop', () => {
      wrapper.find('SaveAndPublish').first().simulate('click');
      wrapper.find('SaveAndPublishConfirmationModal').prop('onCancel')();

      expect(wrapper.find('SaveAndPublishConfirmationModal')).toHaveProp('open', false);
    });
  });

  describe('the DeleteTemplateModal', () => {
    const wrapper = subject();

    it('sets the `open` prop to `true` and closes the popover when clicking on `DeleteTemplate`', () => {
      wrapper.find('DeleteTemplate').simulate('click');

      expect(wrapper.find('DeleteTemplateModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('sets the `open` prop to `false` when invoking the `onCancel` prop', () => {
      wrapper.find('DeleteTemplate').simulate('click');
      wrapper.find('DeleteTemplateModal').prop('onCancel')();

      expect(wrapper.find('DeleteTemplateModal')).toHaveProp('open', false);
    });
  });
});
