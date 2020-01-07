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

  it('renders the modal correctly', () => {
    const { queryByText } = subject();

    expect(queryByText('Stop Monitoring sparkpost.io')).toBeInTheDocument();
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
