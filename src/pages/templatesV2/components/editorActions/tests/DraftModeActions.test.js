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
});
