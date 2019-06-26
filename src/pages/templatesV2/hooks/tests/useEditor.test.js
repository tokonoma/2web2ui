import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useEditor from '../useEditor';

describe('useEditor', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditor(value)} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns default state', () => {
    const wrapper = useTestWrapper();
    const state = useHook(wrapper);

    expect(state).toEqual({
      annotations: [],
      editor: undefined,
      setAnnotations: expect.any(Function),
      setEditor: expect.any(Function)
    });
  });

  it('calls setAnnotations with annotations', () => {
    const setAnnotations = jest.fn();
    const inlineErrors = [{ line: 1, message: 'Oh no!' }];
    const wrapper = useTestWrapper({ inlineErrors });

    act(() => {
      useHook(wrapper).setAnnotations([
        { column: 0, row: 0, text: 'Syntax Error', type: 'error' }
      ]);
      useHook(wrapper).setEditor({ getSession: () => ({ setAnnotations }) });
    });

    expect(setAnnotations).toHaveBeenCalledWith([
      { column: 0, row: 0, text: 'Syntax Error', type: 'error' },
      { column: 0, custom: true, row: 0, text: 'Oh no!', type: 'error' }
    ]);
  });
});
