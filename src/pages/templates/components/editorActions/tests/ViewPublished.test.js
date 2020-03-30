import React from 'react';
import { shallow } from 'enzyme';
import ViewPublished from '../ViewPublished';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('ViewPublished', () => {
  const subject = editorState => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      ...editorState,
    });

    return shallow(<ViewPublished className="Foo" />);
  };

  it('renders ViewPublished action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders a link to published', () => {
    const wrapper = subject();
    expect(wrapper.find('PageLink')).toHaveProp('to', '/templates/edit/foo/published/content');
  });

  it('renders a link to published with subaccount', () => {
    const wrapper = subject({ draft: { id: 'foo', subaccount_id: 1001 } });
    expect(wrapper.find('PageLink')).toHaveProp(
      'to',
      '/templates/edit/foo/published/content?subaccount=1001',
    );
  });
});
