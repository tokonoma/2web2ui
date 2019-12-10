import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import { IncidentsPage } from '../IncidentsPage';
import IncidentsCollection from '../components/IncidentsCollection';

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
    return render(
      <MemoryRouter>
        <IncidentsPage {...defaults} {...props} />
      </MemoryRouter>,
    );
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
    const props = {
      incidents: [],
      monitors: monitors,
      error: null,
      loading: null,
      listMonitors: mockListMonitors,
      listIncidents: mockListIncidents,
    };
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/blacklist']} initialIndex={0}>
        <Switch>
          <Route path="/dashboard" render={() => <div>Redirected Page</div>} />
          <Route path="/blacklist" render={() => <IncidentsPage {...props} />} />
        </Switch>
      </MemoryRouter>,
    );
    expect(queryByText('Redirected Page')).toBeInTheDocument();
  });

  it('loads monitors and incidents when page starts rendering', () => {
    subject();
    expect(mockListMonitors).toHaveBeenCalled();
    expect(mockListIncidents).toHaveBeenCalled();
  });
});
