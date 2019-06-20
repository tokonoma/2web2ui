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
    const updateDraft = jest.fn();
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({ updateDraft, content });
    wrapper.find('UnstyledLink').simulate('click');
    expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, undefined);
  });

  it('saves draft (with subaccount) upon click', () => {
    const updateDraft = jest.fn();
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({ updateDraft, content, draft: { id: 'foo', subaccount_id: 1001 }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, 1001);
  });
});
