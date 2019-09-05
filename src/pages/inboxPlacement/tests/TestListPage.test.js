import { shallow } from 'enzyme';
import React from 'react';
import { tests } from './mockTests';

import { TestListPage } from '../TestListPage';

describe('Page: Test List', () => {

  const subject = ({ ...props }) => {
    const defaults = {
      testsError: false,
      testsPending: false,
      tests: [],
      listTests: jest.fn()
    };
    return shallow(<TestListPage {...defaults} {...props} />);
  };

  it('renders page correctly with defaults', () => {
    const mockListTests = jest.fn();
    const wrapper = subject({ listTests: mockListTests });

    expect(wrapper).toMatchSnapshot();
    expect(mockListTests).toHaveBeenCalled();
  });

  it('renders page with tests', () => {
    const wrapper = subject({ tests });
    expect(wrapper.find('Page')).toMatchSnapshot();
  });

  it('renders empty landing page when there are no tests', () => {
    const wrapper = subject({ tests: []});
    expect(wrapper.find('Page').prop('empty')).toHaveProperty('show', true);
  });

  it('renders loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders error message', () => {
    const wrapper = subject({ error: true });
    expect(wrapper.find('ApiErrorBanner')).toExist();
  });

  describe('Test Name:', () => {

    const renderFirstColumn = (rowProps) => {
      const wrapper = subject();
      const rowFn = wrapper.find('FilterSortCollection').prop('rowComponent');
      const row = rowFn(rowProps)[0];
      return shallow(shallow(row).prop('children')[0]);
    };

    it('render test name and divider if test name exists', () => {
      const firstColumn = renderFirstColumn(tests[0]);
      const spanTexts = firstColumn.find('span');
      expect(spanTexts.someWhere((text) => (text).text().includes(tests[0].test_name))).toEqual(true);
    });

    it('doest not render test name and divider if test name does not exist', () => {
      const { test_name, ...testWithoutName } = tests[0];
      const firstColumn = renderFirstColumn(testWithoutName);
      const spanTexts = firstColumn.find('span');
      expect(spanTexts.someWhere((text) => (text).text().includes(tests[0].from_address))).toEqual(true);
      expect(spanTexts.someWhere((text) => (text).text().includes(tests[0].test_name))).toEqual(false);
    });
  });
});
