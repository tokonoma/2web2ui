import React from 'react';
import { shallow } from 'enzyme';
import ListPage from '../ListPage';
import { ROLES } from 'src/constants';

describe('ListPage', () => {
  const subject = (props = {}) => shallow(
    <ListPage
      canCreate={true}
      getSnippets={() => {}}
      listSubaccounts={() => {}}
      hasSubaccounts={true}
      snippets={[{ id: 'example-id', name: 'Example Snippet' }]}
      subaccounts={[]}
      {...props}
    />
  );

  it('renders page with snippet collection', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('requests snippets when component is mounted', () => {
    const getSnippets = jest.fn();
    const listSubaccounts = jest.fn();
    subject({ getSnippets, listSubaccounts, hasSubaccounts: true });
    expect(getSnippets).toHaveBeenCalled();
    expect(listSubaccounts).toHaveBeenCalled();
  });

  it('renders loading page', () => {
    expect(subject({ loading: true })).toMatchSnapshot();
  });

  it('renders page without primary action button', () => {
    expect(subject({ canCreate: false })).toMatchSnapshot();
  });

  it('renders page with error banner', () => {
    expect(subject({ error: new Error('Oh no!'), snippets: []})).toMatchSnapshot();
  });

  it('renders page without subaccount column', () => {
    expect(subject({ hasSubaccounts: false })).toMatchSnapshot();
  });

  it('renders page without subaccount column if a subaccount reporting user', () => {
    expect(subject({ userAccessLevel: ROLES.SUBACCOUNT_REPORTING })).toMatchSnapshot();
  });

  it('shows empty state', () => {
    const wrapper = subject({ snippets: []});
    expect(wrapper.prop('empty')).toHaveProperty('show', true);
  });
});
