import React from 'react';
import PerPageButtons from '../PerPageButtons';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Per Page Buttons', () => {
  const defaultProps = {
    currentPage: 1,
    onPerPageChange: jest.fn(),
    perPage: 25,
    totalCount: 200,
  };

  const subject = (props = {}) =>
    render(
      <TestApp>
        <PerPageButtons {...defaultProps} {...props} />
      </TestApp>,
    );

  it('should hide PerPageButtons if data is less than minimum per page', () => {
    const { queryAllByRole } = subject({ totalCount: 10 });
    expect(queryAllByRole('button')).toHaveLength(0);
  });

  it('should handle clicking per page buttons', () => {
    const { queryByText } = subject({ perPageButtons: [10, 25] });

    userEvent.click(queryByText('10'));
    expect(defaultProps.onPerPageChange).toHaveBeenCalledWith(10);
  });
});
