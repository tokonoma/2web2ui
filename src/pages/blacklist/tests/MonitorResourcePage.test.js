import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { MonitorResourcePage } from '../MonitorResourcePage';

describe('MonitorResourcePage', () => {
  const mockCreateMonitor = jest.fn();
  const mockShowAlert = jest.fn();
  const mockHistory = { push: jest.fn() };
  const subject = ({ ...props }) => {
    const defaults = {
      createMonitor: mockCreateMonitor,
      showAlert: mockShowAlert,
      history: mockHistory,
      submitPending: false,
      submitError: '',
    };
    return render(
      <MemoryRouter>
        <MonitorResourcePage {...defaults} {...props} />
      </MemoryRouter>,
    );
  };

  it('renders loading component when loading data', () => {
    const { queryByTestId } = subject({ loading: true });

    expect(queryByTestId('loading')).toBeInTheDocument();
  });
});
