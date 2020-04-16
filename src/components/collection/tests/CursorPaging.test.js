import React from 'react';
import { shallow } from 'enzyme';
import CursorPaging, { OGCursorPaging, HibanaCursorPaging } from '../CursorPaging';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from 'src/__testHelpers__/TestApp';

describe('CursorPaging', () => {
  const defaultProps = {
    currentPage: 2,
    handlePageChange: jest.fn(),
    previousDisabled: false,
    nextDisabled: false,
    handleFirstPage: jest.fn(),
    perPage: 25,
    totalCount: 100,
  };

  const subject = (props = {}) =>
    render(
      <TestApp>
        <CursorPaging {...defaultProps} {...props} />
      </TestApp>,
    );

  it('should correctly render cursor paging when there is only one page', () => {
    const newProps = {
      currentPage: 1,
      handlePageChange: jest.fn(),
      previousDisabled: true,
      nextDisabled: true,
      handleFirstPage: jest.fn(),
      perPage: 25,
      totalCount: 20,
    };
    const wrapper = shallow(<OGCursorPaging {...newProps} />);
    expect(wrapper).toMatchSnapshot();
    const HibanaWrapper = shallow(<HibanaCursorPaging {...newProps} />);
    expect(HibanaWrapper).toMatchSnapshot();
  });

  it('should handle clicking rewind to first page', () => {
    const { queryAllByRole } = subject();
    userEvent.click(queryAllByRole('button')[0]);
    expect(defaultProps.handleFirstPage).toHaveBeenCalled();
  });

  it('should handle clicking previous button', () => {
    const { queryAllByRole } = subject();
    userEvent.click(queryAllByRole('button')[1]);
    expect(defaultProps.handlePageChange).toHaveBeenCalledWith(defaultProps.currentPage - 1);
  });

  it('should handle clicking next button', () => {
    const { queryAllByRole } = subject();
    userEvent.click(queryAllByRole('button')[2]);
    expect(defaultProps.handlePageChange).toHaveBeenCalledWith(defaultProps.currentPage + 1);
  });
});
