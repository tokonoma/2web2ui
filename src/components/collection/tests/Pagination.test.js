import React from 'react';
import CollectionPagination from '../Pagination';
import _ from 'lodash';
import { render } from '@testing-library/react';
import TestApp from 'src/__testHelpers__/TestApp';
import Papa from 'papaparse';

jest.mock('papaparse');
Date.now = jest.fn(() => 1512509841582);

describe('Collection Pagination Component', () => {
  const defaultProps = {
    data: _.times(5, i => ({ key: i + 1 })),
    perPage: 2,
    currentPage: 1,
    onPageChange: () => {},
  };

  const subject = (props = {}) =>
    render(
      <TestApp>
        <CollectionPagination {...defaultProps} {...props} />
      </TestApp>,
    );

  beforeEach(() => {
    Papa.unparse = jest.fn(() => 'mydata');
  });

  // render() returns null if currentPage isn't passed
  it('should render null with no props', () => {
    const wrapper = render(
      <TestApp>
        <CollectionPagination />
      </TestApp>,
    );
    expect(wrapper.container.firstChild).toEqual(null);
  });

  it('should hide pagination if data is less than per page', () => {
    const { queryByText } = subject({ perPage: 10 });
    expect(queryByText('1')).not.toBeInTheDocument();
  });
});
