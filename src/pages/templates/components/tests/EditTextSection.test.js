import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditTextSection from '../EditTextSection';

jest.mock('../../hooks/useEditorContext');

describe('EditTextSection', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      content: { text: 'Test Example' },
      isReadOnly: false,
      setContent: () => {},
      ...editorState,
    });

    return shallow(<EditTextSection />);
  };

  it('renders an editor', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly in readOnly mode', () => {
    expect(subject({ editorState: { isReadOnly: true } }).prop('readOnly')).toBe(true);
  });

  it('sets content on change', () => {
    const setContent = jest.fn();
    const wrapper = subject({ editorState: { setContent } });

    wrapper.simulate('change', 'New Value');

    expect(setContent).toHaveBeenCalledWith({ text: 'New Value' });
  });
});
