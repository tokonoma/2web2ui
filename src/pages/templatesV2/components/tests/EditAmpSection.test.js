import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditAmpSection from '../EditAmpSection';

jest.mock('../../hooks/useEditorContext');

describe('EditAmpSection', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      content: { amp_html: '<html ⚡4email>' },
      setContent: () => {},
      ...editorState
    });

    return shallow(<EditAmpSection />);
  };

  it('renders an editor', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly in readOnly mode', () => {
    expect(subject({ editorState: { isPublishedMode: true }}).prop('readOnly')).toBe(true);
  });

  it('sets content on change', () => {
    const setContent = jest.fn();
    const wrapper = subject({ editorState: { setContent }});

    wrapper.simulate('change', '<html ⚡4email><h1>New Value</h1>');

    expect(setContent).toHaveBeenCalledWith({ amp_html: '<html ⚡4email><h1>New Value</h1>' });
  });
});
