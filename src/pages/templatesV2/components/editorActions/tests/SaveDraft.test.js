import React from 'react';
import { shallow } from 'enzyme';
import SaveDraft from '../SaveDraft';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('SaveDraft', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      history: {},
      ...editorState
    });

    return shallow(<SaveDraft className={'Foo'}/>);
  };

  it('renders save draft action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('saves draft upon click', () => {
    const promise = Promise.resolve();
    const updateDraft = jest.fn(() => promise);
    const setHasSaved = jest.fn();
    const showAlert = jest.fn();
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({
      updateDraft,
      content,
      setHasSaved,
      showAlert
    });

    wrapper.find('UnstyledLink').simulate('click');

    return promise.then(() => {
      expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, undefined);
      expect(setHasSaved).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalled();
    });
  });

  it('saves draft (with subaccount) upon click', () => {
    const promise = Promise.resolve();
    const updateDraft = jest.fn(() => promise);
    const setHasSaved = jest.fn();
    const showAlert = jest.fn();
    const content = {
      text: 'foo text',
      html: '<h1>foo html</h1>'
    };
    const draft = {
      id: 'foo',
      subaccount_id: 1001
    };
    const wrapper = subject({
      draft,
      updateDraft,
      content,
      setHasSaved,
      showAlert
    });

    wrapper.find('UnstyledLink').simulate('click');

    return promise.then(() => {
      expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, 1001);
      expect(setHasSaved).toHaveBeenCalled();
      expect(showAlert).toHaveBeenCalled();
    });
  });
});
