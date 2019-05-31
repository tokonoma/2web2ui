import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewContainer from '../PreviewContainer';

jest.mock('../../hooks/useEditorContext');

describe('PreviewContainer', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({ previewDevice: 'desktop', ...editorState });
    return shallow(<PreviewContainer children={<div>Example</div>} />);
  };

  it('renders desktop container', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders mobile container', () => {
    expect(subject({ editorState: { previewDevice: 'mobile' }})).toMatchSnapshot();
  });
});
