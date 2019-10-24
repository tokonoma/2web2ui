import { selectSearchInitialValues, selectSuppresionsList } from '../suppressions';

describe('Selector: suppressions', () => {
  const store = {
    suppressions: {
      search: {
        types: ['typeA', 'typeB', 'typeC'],
        sources: ['source1', 'source2']
      }
    },
    subaccounts: {
      list: []
    }
  };

  it('should select initial values for the suppressions search form', () => {
    expect(selectSearchInitialValues(store)).toEqual({
      types: {
        typeA: true,
        typeB: true,
        typeC: true
      },
      sources: {
        source1: true,
        source2: true
      }
    });
  });

  it('should select suppression list with subaccount_name if subaccount_id is present', () => {
    expect(selectSuppresionsList).toMatchSnapshot();
  });

});
