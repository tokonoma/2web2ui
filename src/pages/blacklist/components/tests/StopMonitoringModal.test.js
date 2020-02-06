import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { StopMonitoringModal } from '../StopMonitoringModal';

describe('Stop Monitoring Modal', () => {
  const closeModal = jest.fn();
  const deleteMonitor = jest.fn().mockResolvedValue();
  const showAlert = jest.fn();
  const monitorToDelete = 'sparkpost.io';
  const subject = ({ ...props }) => {
    const defaults = { closeModal, monitorToDelete, deleteMonitor, showAlert };

    return render(<StopMonitoringModal {...defaults} {...props} />);
  };

  it('renders the modal correctly for an ip address', () => {
    const { queryByText } = subject({ monitorToDelete: '1.2.3.4' });

    expect(queryByText('Stop Monitoring 1.2.3.4')).toBeInTheDocument();
    expect(
      queryByText(
        "Removing this IP from your watchlist means you won't get notified of changes, but don't worry you can always add it again later.",
      ),
    ).toBeInTheDocument();
    expect(queryByText('Stop Monitoring')).toBeInTheDocument();
  });

  it('renders the modal correctly for a sending domain', () => {
    const { queryByText } = subject({ monitorToDelete: 'test.com' });

    expect(queryByText('Stop Monitoring test.com')).toBeInTheDocument();
    expect(
      queryByText(
        "Removing this domain from your watchlist means you won't get notified of changes, but don't worry you can always add it again later.",
      ),
    ).toBeInTheDocument();
    expect(queryByText('Stop Monitoring')).toBeInTheDocument();
  });

  it('upon clicking the confirm button, deletes the resource, shows alert, and closes the modal', async () => {
    const { queryByText } = subject();

    await fireEvent.click(queryByText('Stop Monitoring'));
    expect(deleteMonitor).toHaveBeenCalled();
    expect(showAlert).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });
});
