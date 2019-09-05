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

  it('Sets the `DuplicateTemplateModal` open prop to `true` when clicking on `DuplicateTemplate`', () => {
    const wrapper = subject();
    const duplicateButton = wrapper.find('DuplicateTemplate');

    duplicateButton.simulate('click');

    expect(wrapper.find('DuplicateTemplateModal').props().open).toEqual(true);
  });

  it('Sets the `SaveAndPublishConfirmationModal` oen prop to `true` when clicking on `SaveAndPublish`', () => {
    const wrapper = subject();
    const saveAndPublishButton = wrapper.find('SaveAndPublish').first();

    saveAndPublishButton.simulate('click');

    expect(wrapper.find('SaveAndPublishConfirmationModal').props().open).toEqual(true);
  });
});
