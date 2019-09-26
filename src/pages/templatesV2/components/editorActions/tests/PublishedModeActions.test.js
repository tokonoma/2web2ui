import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import PublishedModeActions from '../PublishedModeActions';

jest.mock('../../../hooks/useEditorContext');

describe('PublishedModeActions', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      hasDraft: true,
      ...editorState
    });

    return shallow(<PublishedModeActions />);
  };

  it('renders published actions', () => {
    expect(subject()).toMatchSnapshot();
  });
});
