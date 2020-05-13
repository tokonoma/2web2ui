import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditContentsPrimaryArea from '../EditContentsPrimaryArea';
import DraftModeActions from '../editorActions/DraftModeActions';
import PublishedModeActions from '../editorActions/PublishedModeActions';

jest.mock('../../hooks/useEditorContext');

describe('EditContentsPrimaryArea', () => {
  const subject = editorState => {
    useEditorContext.mockReturnValue({ draft: { id: 'foo' }, canModify: true, ...editorState });

    return shallow(<EditContentsPrimaryArea />);
  };

  it('render published mode actions', () => {
    expect(subject({ isPublishedMode: true }).equals(<PublishedModeActions />)).toBe(true);
  });

  it('render draft mode actions', () => {
    expect(subject({ isPublishedMode: false }).equals(<DraftModeActions />)).toBe(true);
  });

  it('renders nothing when the user does not have the grant to modify templaets', () => {
    // See: https://stackoverflow.com/questions/47259061/jest-enzyme-test-a-react-component-that-returns-null-in-render-method
    expect(subject({ isPublishedMode: false, canModify: false }).get(0)).toBeNull();
  });
});
