import { shallow, mount } from 'enzyme';
import React from 'react';
import { IncidentsPage } from '../IncidentsPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('IncidentsPage', () => {
  const incidents = [
    {
      id: 1,
      resource: '101.101',
      blacklist_code: 'spammy mcspamface',
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

  const subject = ({ ...props }) => {
    const defaults = {
      incidents: incidents,
      monitors: monitors,
      error: null,
      loading: null,
    };
    return shallow(<IncidentsPage {...defaults} {...props} />);
  };

  it('renders page correctly', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading when loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders error banner when an error occurs', () => {
    const wrapper = subject({ error: { message: 'an error occurred' } });
    expect(wrapper.find('ApiErrorBanner')).toExist();
  });

  it('renders redirect to watchlist when monitored resources exist but no incidents', () => {
    const wrapper = subject({ incidents: [] });
    expect(wrapper.find('Redirect')).toExist();
  });

  it('loads monitors and incidents when page starts rendering', () => {
    const mockListMonitors = jest.fn();
    const mockListIncidents = jest.fn();
    const defaults = {
      incidents: incidents,
      monitors: monitors,
      error: null,
      loading: null,
      listMonitors: mockListMonitors,
      listIncidents: mockListIncidents,
    };
    mount(
      <Router>
        <IncidentsPage {...defaults} />
      </Router>,
    );
    expect(mockListMonitors).toHaveBeenCalled();
    expect(mockListIncidents).toHaveBeenCalled();
  });
});
