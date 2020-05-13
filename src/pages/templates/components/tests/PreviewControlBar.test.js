import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewControlBar from '../PreviewControlBar';
import styles from '../PreviewControlBar.module.scss';

jest.mock('../../hooks/useEditorContext');
jest.mock('src/hooks/useHibanaOverride');

describe('PreviewControlBar', () => {
  const subject = ({ editorState } = {}) => {
    useHibanaOverride.mockImplementationOnce(() => styles);
    useEditorContext.mockReturnValue({
      previewDevice: 'desktop',
      canSend: true,
      ...editorState,
    });
    return shallow(<PreviewControlBar />);
  };

  it('renders control bar', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('does not render the "Send a Test" button if the user does not have the grant to send', () => {
    const wrapper = subject({ editorState: { canSend: false } });

    expect(wrapper.find('SendTestEmailButton')).not.toExist();
  });

  it('renders the "Send a Test" button if the user does have permmission to send', () => {
    const wrapper = subject({ editorState: { canSend: true } });

    expect(wrapper.find('SendTestEmailButton')).toExist();
  });

  it('calls setPreviewDevice when desktop button is clicked', () => {
    const setPreviewDevice = jest.fn();
    const wrapper = subject({ editorState: { setPreviewDevice } });

    wrapper.find('#preview-content-desktop-button').simulate('click');

    expect(setPreviewDevice).toHaveBeenCalledWith('desktop');
  });

  it('calls setPreviewDevice when mobile button is clicked', () => {
    const setPreviewDevice = jest.fn();
    const wrapper = subject({ editorState: { setPreviewDevice } });

    wrapper.find('#preview-content-mobile-button').simulate('click');

    expect(setPreviewDevice).toHaveBeenCalledWith('mobile');
  });
});
