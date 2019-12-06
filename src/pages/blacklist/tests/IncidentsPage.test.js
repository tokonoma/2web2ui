import { render } from '@testing-library/react';

import React from 'react';
import { IncidentsPage } from '../IncidentsPage';
import IncidentsCollection from '../components/IncidentsCollection';

jest.mock('react-router-dom');
const { Redirect } = require('react-router-dom');
jest.mock('../components/IncidentsCollection');
IncidentsCollection.mockImplementation(() => <div></div>);

describe('IncidentsPage', () => {
  const incidents = [
    {
      id: 1,
      resource: '101.101',
      blacklist_name: 'spammy mcspamface',
      occurred_at_formatted: 'Dec 3 2019 at 10:00am',
      occurred_at_timestamp: 123456789,
    },
  ];

  const monitors = [
    {
      resource: '101.101',
      currently_blacklisted_on: [],
    },
  ];

  const mockListMonitors = jest.fn();
  const mockListIncidents = jest.fn();

  const subject = ({ ...props }) => {
    const defaults = {
      incidents: incidents,
      monitors: monitors,
      error: null,
      loading: null,
      listMonitors: mockListMonitors,
      listIncidents: mockListIncidents,
    };
    return render(<IncidentsPage {...defaults} {...props} />);
  };

  it('renders loading component when loading data', () => {
    const { queryByTestId } = subject({ loading: true });

    expect(queryByTestId('loading')).toBeInTheDocument();
  });

  it('renders error banner when an error occurs', () => {
    const { queryByTestId } = subject({ error: { message: 'an error occurred' } });
    //Can't search for the text because it is initially hidden
    expect(queryByTestId('error-banner')).toBeInTheDocument();
  });

  it('renders Incidents Collection when correct data exists', () => {
    const { queryByTestId } = subject();
    expect(queryByTestId('incidents-table')).toBeInTheDocument();
  });

  it('redirect to watchlist when monitored resources exist but no incidents', () => {
    subject({ incidents: [] });
    expect(Redirect).toHaveBeenCalledTimes(1);
    const callArguments = Redirect.mock.calls[0];
    expect(callArguments).toContainEqual(
      expect.objectContaining({
        to: '/dashboard',
      }),
    );
  });

  it('loads monitors and incidents when page starts rendering', () => {
    subject();
    expect(mockListMonitors).toHaveBeenCalled();
    expect(mockListIncidents).toHaveBeenCalled();
  });
});
