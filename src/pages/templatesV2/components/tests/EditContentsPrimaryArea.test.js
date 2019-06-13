import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditContentsPrimaryArea from '../EditContentsPrimaryArea';

jest.mock('../../hooks/useEditorContext');

describe('EditContentsPrimaryArea', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({ draft: { id: 'foo' }, ...editorState });
    return shallow(<EditContentsPrimaryArea/>);
  };

  it('render published mode actions', () => {
    expect(subject({ isPublishedMode: true })).toMatchSnapshot();
  });

  it('render draft mode actions', () => {
    expect(subject({ isPublishedMode: false })).toMatchSnapshot();
  });
});
