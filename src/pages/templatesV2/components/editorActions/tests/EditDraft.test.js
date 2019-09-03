import React from 'react';
import { shallow } from 'enzyme';
import EditDraft from '../EditDraft';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('EditDraft', () => {
  const subject = (editorState, children = null) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      history: {},
      ...editorState
    });

    return shallow(<EditDraft className={'Foo'}>{children}</EditDraft>);
  };

  it('renders edit draft action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders edit draft action with provided children', () => {
    /* eslint-disable no-useless-escape */
    expect(subject(null,
      <span>Click here</span>).find('UnstyledLink').html()).toMatch('<a href=\"javascript:void(0);\" target=\"\" rel=\"\" role=\"button\"><span>Click here</span></a>');
    /* eslint-enable no-useless-escape */
  });

  it('routes to draft path on click', () => {
    const push = jest.fn();
    const wrapper = subject({ history: { push }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/draft/content');
  });

  it('routes to draft path with subaccount on click', () => {
    const push = jest.fn();
    const wrapper = subject({ history: { push }, draft: { id: 'foo', subaccount_id: 101 }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/draft/content?subaccount=101');
  });
});
