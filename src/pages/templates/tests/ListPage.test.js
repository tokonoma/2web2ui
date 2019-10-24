import React from 'react';
import { shallow } from 'enzyme';
import { ROLES } from 'src/constants';

import ListPage from '../ListPage';

describe('ListPage', () => {
  const subject = (props = {}) => shallow(
    <ListPage
      canModify={true}
      hasSubaccounts={false}
      listTemplates={() => {}}
      listSubaccounts={() => {}}
      subaccounts={[]}
      loading={false}
      templates={[
        {
          published: true,
          id: 'id1',
          name: 'subaccount template',
          last_update_time: '2017-08-10T14:15:16+00:00',
          subaccount_id: 101,
          shared_with_subaccounts: false
        },
        {
          published: false,
          id: 'id2',
          name: 'shared template',
          last_update_time: '2017-08-10T14:15:16+00:00',
          shared_with_subaccounts: true
        },
        {
          published: false,
          id: 'id3',
          name: 'master template',
          last_update_time: '2017-08-10T14:15:16+00:00'
        }
      ]}
      {...props}
    />
  );

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('loads templates on load', () => {
    const listTemplates = jest.fn();
    subject({ listTemplates });
    expect(listTemplates).toHaveBeenCalled();
  });

  it('renders without primary action for read-only users', () => {
    const wrapper = subject({ canModify: false });
    expect(wrapper).toHaveProp('primaryAction', undefined);
  });

  it('renders empty state', () => {
    const wrapper = subject({ templates: []});
    expect(wrapper).toHaveProp('empty', expect.objectContaining({ show: true }));
  });

  it('renders Loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  describe('renders columns', () => {
    it('with all columns', () => {
      const wrapper = subject({ hasSubaccounts: true });
      expect(wrapper.find('TableCollection').prop('columns')).toMatchSnapshot();
    });

    it('without subaccount column for reporting users', () => {
      const wrapper = subject({ hasSubaccounts: true, userAccessLevel: ROLES.SUBACCOUNT_REPORTING });
      const columns = wrapper.find('TableCollection').prop('columns');

      expect(columns.find((column) => column && column.label === 'Subaccount')).toBeUndefined();
    });

    it('without subaccount column for account without subaccounts', () => {
      const wrapper = subject({ hasSubaccounts: false });
      const columns = wrapper.find('TableCollection').prop('columns');

      expect(columns.find((column) => column && column.label === 'Subaccount')).toBeUndefined();
    });
  });

  describe('renders error banner', () => {
    it('with error details', () => {
      const wrapper = subject({ error: new Error('Oh no!'), templates: []});
      expect(wrapper.find('ApiErrorBanner')).toHaveProp('errorDetails', 'Oh no!');
    });

    it('with reload button', () => {
      const listTemplates = jest.fn();
      const wrapper = subject({
        error: new Error('Oh no!'),
        listTemplates,
        templates: []
      });

      expect(wrapper.find('ApiErrorBanner')).toHaveProp('reload', listTemplates);
    });
  });

  describe('renders rows', () => {
    const renderRows = (props = {}) => {
      const wrapper = subject(props);
      const getRowData = wrapper.find('TableCollection').prop('getRowData');
      const rows = wrapper.find('TableCollection').prop('rows');

      return rows.map(getRowData);
    };

    it('with all columns', () => {
      const rows = renderRows({ hasSubaccounts: true });
      expect(rows).toMatchSnapshot();
    });

    it('without subaccount column for reporting users', () => {
      const rows = renderRows({ hasSubaccounts: true, userAccessLevel: ROLES.SUBACCOUNT_REPORTING });
      expect(rows[0]).toHaveLength(4);
    });

    it('without subaccount column for account without subaccounts', () => {
      const rows = renderRows({ hasSubaccounts: false });
      expect(rows[0]).toHaveLength(4);
    });
  });
});
