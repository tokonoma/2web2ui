import { shallow, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import FilterSortCollection from '../FilterSortCollection';
import { Table } from '@sparkpost/matchbox';
import { BrowserRouter as Router } from 'react-router-dom';

describe('FilterSortCollection Component', () => {
  const fruits = ['apple', 'banana', 'carrot'];
  const vegetables = ['artichoke', 'broccoli', 'celery'];
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
      fruit: fruits[0],
      vegetable: vegetables[2]
    }, {
      fruit: fruits[1],
      vegetable: vegetables[0]
    }, {
      fruit: fruits[2],
      vegetable: vegetables[1]
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

  describe('renders', () => {

    const subject = (props = {}) => shallow(
      <Router>
        <FilterSortCollection {...props}/>
      </Router>
    );

    it('renders without props', () => {
      expect(subject()).toMatchSnapshot();
    });

    it('renders with props', () => {
      expect(subject({ ...props })).toMatchSnapshot();
    });
  });

  describe('sorts', () => {

    const subject = (props = {}) => mount(
      <Router>
        <FilterSortCollection {...props}/>
      </Router>
    );

    it('sorts default sort column (fruits) values in default descending order', () => {
      const wrapper = subject({ ...props });
      const rowsWrapper = wrapper.find('rowComponent');

      expect(rowsWrapper).toHaveLength(3);
      rowsWrapper.forEach((rowWrapper, i) => {
        expect(rowWrapper.prop('fruit')).toEqual(fruits.slice().reverse()[i]);
      });
    });

    it('sorts default sort column values (fruit) in ascending order', () => {
      const wrapper = subject({ ...props, defaultSortDirection: 'asc' });
      const rowsWrapper = wrapper.find('rowComponent');

      expect(rowsWrapper).toHaveLength(3);
      rowsWrapper.forEach((rowWrapper, i) => {
        expect(rowWrapper.prop('fruit')).toEqual(fruits[i]);
      });
    });

    it('sorts selected sort column (vegetables) values in default descending order', () => {
      const wrapper = subject({ ...props });
      act(() => {
        wrapper.find('select option[value="vegetable"]').simulate('change');
      });
      wrapper.update();
      const rowsWrapper = wrapper.find('rowComponent');

      expect(rowsWrapper).toHaveLength(3);
      rowsWrapper.forEach((rowWrapper, i) => {
        expect(rowWrapper.prop('vegetable')).toEqual(vegetables.slice().reverse()[i]);
      });
    });

    it('sorts selected sort column (vegetables) values in ascending order', () => {
      const wrapper = subject({ ...props, defaultSortDirection: 'asc' });
      act(() => {
        wrapper.find('select option[value="vegetable"]').simulate('change');
      });
      wrapper.update();
      const rowsWrapper = wrapper.find('rowComponent');

      expect(rowsWrapper).toHaveLength(3);
      rowsWrapper.forEach((rowWrapper, i) => {
        expect(rowWrapper.prop('vegetable')).toEqual(vegetables[i]);
      });
    });
  });
});
