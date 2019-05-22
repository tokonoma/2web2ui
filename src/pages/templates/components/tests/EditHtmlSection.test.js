import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditHtmlSection from '../EditHtmlSection';

jest.mock('../../hooks/useEditorContext');

describe('EditHtmlSection', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      content: { html: '<h1>Test</h1>' },
      setContent: () => {},
      ...editorState
    });

    return shallow(<EditHtmlSection />);
  };

  it('renders an editor', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('sets content on change', () => {
    const setContent = jest.fn();
    const wrapper = subject({ editorState: { setContent }});

    wrapper.simulate('change', '<h1>New Value</h1>');

    expect(setContent).toHaveBeenCalledWith({ html: '<h1>New Value</h1>' });
  });
});
