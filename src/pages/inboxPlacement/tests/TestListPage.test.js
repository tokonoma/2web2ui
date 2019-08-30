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

  it('doest not render test name and divider if test name does not exist', () => {
    const wrapper = subject();
    const rowFn = wrapper.find('FilterSortCollection').prop('rowComponent');

    const { test_name, ...testWithoutName } = tests[0];
    const row = rowFn(testWithoutName)[0];
    const firstColumn = (shallow(shallow(row).prop('children')[0]));
    expect(firstColumn.find({ id: 'testName' })).not.toExist();
    expect(firstColumn.find({ id: 'fromAddress' })).toExist();
  });
});
