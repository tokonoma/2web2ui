import React from 'react';
import _ from 'lodash';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from 'src/__testHelpers__/TestApp';
import ApiErrorBanner from '../ApiErrorBanner';

describe('ApiErrorBanner Component', () => {
  const defaultProps = {
    message: 'Clean the conference room',
    title: 'You Have Another Mission',
    status: 'info',
  };

  const subject = (props = {}) =>
    render(
      <TestApp>
        <ApiErrorBanner {...props} />
      </TestApp>,
    );

  it('should render with no props', () => {
    const { container } = render(
      <TestApp>
        <ApiErrorBanner />
      </TestApp>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with default props', () => {
    const { container } = subject(defaultProps);

    expect(container).toMatchSnapshot();
  });

  it('should render with the reload button', () => {
    const mockReload = jest.fn();
    const { queryByText } = subject({ reload: mockReload });

    expect(queryByText('Try Again')).toBeInTheDocument();
    userEvent.click(queryByText('Try Again'));
    expect(mockReload).toHaveBeenCalled();
  });

  it('should render with error details, allowing the user to reveal those details by clicking the "Show Error Details" button', () => {
    const { queryByText } = subject({ ...defaultProps, errorDetails: 'Hello there.' });

    expect(queryByText('Hello there.')).not.toBeInTheDocument();
    userEvent.click(queryByText('Show Error Details'));
    expect(queryByText('Hello there.')).toBeInTheDocument();
    userEvent.click(queryByText('Hide Error Details'));
    expect(queryByText('Hello there.')).not.toBeInTheDocument();
  });

  it('should render when error prop is passed', () => {
    const error = {
      payload: { message: 'error message' },
      meta: { method: 'GET' },
      resource: 'your resource',
    };

    const { container } = subject({ error });

    expect(container).toMatchSnapshot();
  });
});
