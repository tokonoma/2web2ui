import { selectSnippets } from '../snippets';

describe('Snippets Selector', () => {
  const state = {
    snippets: {
      items: [
        {
          created_at: '2019-10-08T19:45:22.288Z',
          id: 'this-is-a-brand-new-template',
          name: 'Templates Test Data',
          shared_with_subaccounts: false,
          subaccount_id: 'subId'
        }
      ]
    },
    subaccounts: {
      list: [
        { id: 'subId', name: 'subName' }
      ]
    }
  };


  it('selects snippets with subaccountName if subaccount_id is present', () => {
    expect(selectSnippets(state)).toMatchSnapshot();
  });
});
