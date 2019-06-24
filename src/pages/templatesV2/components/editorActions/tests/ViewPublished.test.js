import React from 'react';
import { shallow } from 'enzyme';
import ViewPublished from '../ViewPublished';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('ViewPublished', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },

      ...editorState
    });

    return shallow(<ViewPublished className={'Foo'}/>);
  };

  it('renders ViewPublished action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('redirects to published path upon click', () => {
    const push = jest.fn();
    const wrapper = subject({ history: { push }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content');
  });

  it('redirects to published path (with subaccount) upon click', () => {
    const push = jest.fn();
    const wrapper = subject({ history: { push }, draft: { id: 'foo', subaccount_id: 1001 }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content?subaccount=1001');
  });
});
