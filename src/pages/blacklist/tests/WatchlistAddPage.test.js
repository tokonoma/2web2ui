import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { WatchlistAddPage } from '../WatchlistAddPage';

const ipOrSendingDomainText = 'Add IP or Sending Domain';
const saveText = 'Save';
const saveAndContinueText = 'Save and Add Another';

describe('WatchlistAddPage', () => {
  const mockwatchlistAdd = jest.fn(() => Promise.resolve());
  const mockShowAlert = jest.fn();
  const mockHistory = { push: jest.fn() };
  const subject = props => {
    const defaults = {
      watchlistAdd: mockwatchlistAdd,
      showAlert: mockShowAlert,
      history: mockHistory,
      submitPending: false,
      submitError: undefined,
    };
    return render(
      <MemoryRouter>
        <WatchlistAddPage {...defaults} {...props} />
      </MemoryRouter>,
    );
  };

  it('displays the add IP or sending domain field', () => {
    const { getByLabelText } = subject();
    expect(getByLabelText(ipOrSendingDomainText)).toBeInTheDocument();
  });

  it('displays the Save button', () => {
    const { getByText } = subject();
    expect(getByText(saveText)).toBeInTheDocument();
  });

  it('displays the Save and Add Another button', () => {
    const { getByText } = subject();
    expect(getByText(saveAndContinueText)).toBeInTheDocument();
  });

  it('displays the Save button as disabled on load', () => {
    const { getByText } = subject();
    expect(getByText(saveText)).toHaveProperty('disabled');
  });

  it('displays the Save and Add Another button as disabled on load', () => {
    const { getByText } = subject();
    expect(getByText(saveAndContinueText)).toHaveProperty('disabled');
  });

  it('submits the resource and redirects on save', () => {
    const resource = 'test';
    const promise = Promise.resolve({ resource });
    const watchlistAdd = jest.fn(() => promise);
    const { getByLabelText, getByText } = subject({ watchlistAdd });

    const input = getByLabelText(ipOrSendingDomainText);
    const save = getByText(saveText);
    fireEvent.change(input, { target: { value: resource } });
    expect(input.value).toBe(resource);
    fireEvent.click(save);

    expect(watchlistAdd).toBeCalledWith(resource);
    promise.then(() => {
      expect(mockHistory.push).toBeCalledWith('/blacklist/watchlist');
      expect(mockShowAlert).toBeCalledWith({
        type: 'success',
        message: `Added ${resource} to Watchlist`,
      });
    });
  });

  it('submits the resource and resets input on save and continue', () => {
    const resource = 'test';
    const promise = Promise.resolve({ resource });
    const watchlistAdd = jest.fn(() => promise);
    const { getByLabelText, getByText } = subject({ watchlistAdd });

    const input = getByLabelText(ipOrSendingDomainText);
    const saveAndContinue = getByText(saveAndContinueText);
    fireEvent.change(input, { target: { value: resource } });
    fireEvent.click(saveAndContinue);

    expect(watchlistAdd).toBeCalledWith(resource);
    promise.then(() => {
      expect(mockHistory.push).not.toBeCalledWith('/blacklist/watchlist');
      expect(mockShowAlert).toBeCalledWith({
        type: 'success',
        message: `Added ${resource} to Watchlist`,
      });
      expect(input.value).toBe('');
    });
  });

  it('validation error displays when prop is set', () => {
    const { getByText } = subject({ submitError: { message: 'test validation error' } });
    expect(getByText('test validation error')).toBeInTheDocument();
  });
});
