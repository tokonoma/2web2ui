import React from 'react';
import { shallow } from 'enzyme';
import useEditor from '../../hooks/useEditor';
import Editor from '../Editor';

jest.mock('../../hooks/useEditor');

describe('Editor', () => {
  const subject = ({ editorState, ...props } = {}) => {
    useEditor.mockReturnValue({ ...editorState });
    return shallow(<Editor {...props} />);
  };

  it('renders editor', () => {
    expect(subject({ value: 'Example' })).toMatchSnapshot();
  });

  it('sets null value to empty string', () => {
    const wrapper = subject({ mode: 'html', value: null });
    expect(wrapper.find('ReactAce')).toHaveProp('value', '');
  });

  it('sets undefined value to empty string', () => {
    const wrapper = subject({ mode: 'html' });
    expect(wrapper.find('ReactAce')).toHaveProp('value', '');
  });

  it('initializes useEditor hook with inlineErrors', () => {
    const inlineErrors = [{ line: 123, message: 'Oh no!' }];
    subject({ inlineErrors });

    expect(useEditor).toHaveBeenCalledWith({ inlineErrors });
  });

  it('calls setEditor on load', () => {
    const setEditor = jest.fn();
    const wrapper = subject({ editorState: { setEditor }});

    wrapper.find('ReactAce').simulate('load');

    expect(setEditor).toHaveBeenCalled();
  });

  it('calls setAnnotations on validate', () => {
    const setAnnotations = jest.fn();
    const wrapper = subject({ editorState: { setAnnotations }});

    wrapper.find('ReactAce').simulate('validate');

    expect(setAnnotations).toHaveBeenCalled();
  });
});
