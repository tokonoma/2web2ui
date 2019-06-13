import React from 'react';
import { shallow } from 'enzyme';
import Duplicate from '../Duplicate';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('Duplicate', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      history: {},
      ...editorState
    });

    return shallow(<Duplicate className={'Foo'}/>);
  };

  it('renders duplicate action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('routes to duplicate path on click', () => {
    const push = jest.fn();
    const wrapper = subject({ history: { push }});
    wrapper.find('UnstyledLink').simulate('click');
    expect(push).toHaveBeenCalledWith('/templatesv2/create/foo');
  });
});
