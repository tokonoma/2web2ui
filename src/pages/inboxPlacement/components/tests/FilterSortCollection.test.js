import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import FilterSortCollection from '../FilterSortCollection';
import { Table } from '@sparkpost/matchbox';
import { BrowserRouter as Router } from 'react-router-dom';
import MockDate from 'mockdate';
MockDate.set(1434319925275);

describe('FilterSortCollection Component', () => {
  const props = {
    title: 'Menu',
    selectOptions: [{ value: 'fruit', label: 'Fruit' },
      { value: 'vegetable', label: 'Vegetable' }],
    filterBoxConfig: {
      show: true,
      itemToStringKeys: ['fruit', 'vegetable'],
      placeholder: 'Search By: Fruit, Vegetable',
      wrapper: (props) => (
        <div>
          {props}
        </div>)
    },
    defaultSortColumn: 'fruit',
    rows: [{
      fruit: 'apple',
      vegetable: 'celery'
    }, {
      fruit: 'banana',
      vegetable: 'artichoke'
    }, {
      fruit: 'carrot',
      vegetable: 'broccoli'
    }],
    rowComponent: ({ fruit, vegetable }, iterator) => ([
      <Table.Row
        key={iterator}
        rowData={[<div>
          <p>{fruit}</p>
          <p>{vegetable}</p>
        </div>]}
      />
    ])
  };

  const subject = (props = {}) => mount(
    <Router>
      <FilterSortCollection {...props}/>
    </Router>
  );

  describe('renders', () => {
    it('renders without props', () => {
      expect(subject()).toMatchSnapshot();
    });

    it('renders with props', () => {
      expect(subject({ ...props })).toMatchSnapshot();
    });
  });

  describe('sorts', () => {

    it('sorts default sort column values in default descending order', () => {
      const wrapper = subject({ ...props });
      expect(wrapper.find('table').props()).toMatchSnapshot();
    });

    it('sorts default sort column values in ascending order', () => {
      const wrapper = subject({ ...props, defaultSortDirection: 'asc' });
      expect(wrapper.find('table').props()).toMatchSnapshot();
    });

    it('sorts selected sort column values in default descending order', () => {
      const wrapper = subject({ ...props });
      act(() => {
        wrapper.find('select option[value="vegetable"]').simulate('change');
      });
      wrapper.update();
      expect(wrapper.find('table').props()).toMatchSnapshot();
    });

    it('sorts selected sort column values in ascending order', () => {
      const wrapper = subject({ ...props, defaultSortDirection: 'asc' });
      act(() => {
        wrapper.find('select option[value="vegetable"]').simulate('change');
      });
      wrapper.update();
      expect(wrapper.find('table').props()).toMatchSnapshot();
    });
  });
});
