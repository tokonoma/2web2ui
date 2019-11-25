import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewControlBar from '../PreviewControlBar';

jest.mock('../../hooks/useEditorContext');

describe('PreviewControlBar', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      previewDevice: 'desktop',
      ...editorState
    });
    return shallow(<PreviewControlBar />);
  };

  it('renders control bar', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls setPreviewDevice when desktop button is clicked', () => {
    const setPreviewDevice = jest.fn();
    const wrapper = subject({ editorState: { setPreviewDevice }});

    wrapper.find('#preview-content-desktop-button').simulate('click');

    expect(setPreviewDevice).toHaveBeenCalledWith('desktop');
  });

  it('calls setPreviewDevice when mobile button is clicked', () => {
    const setPreviewDevice = jest.fn();
    const wrapper = subject({ editorState: { setPreviewDevice }});

    wrapper.find('#preview-content-mobile-button').simulate('click');

    expect(setPreviewDevice).toHaveBeenCalledWith('mobile');
  });
});
