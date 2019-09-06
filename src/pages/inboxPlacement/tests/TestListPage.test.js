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
    const renderFirstColumn = (props) => {
      const wrapper = subject();
      const Rows = wrapper.find('FilterSortCollection').prop('rowComponent');
      const Row = () => shallow(<Rows {...tests[0]} {...props} />).prop('rowData');

      return shallow(<Row />);
    };

    it('render test name and divider if test name exists', () => {
      const wrapper = renderFirstColumn();
      expect(wrapper.at(0)).toIncludeText(tests[0].test_name);
    });

    it('doest not render test name and divider if test name does not exist', () => {
      const wrapper = renderFirstColumn({ test_name: undefined });
      expect(wrapper.at(0)).not.toIncludeText('|');
    });
  });
});
