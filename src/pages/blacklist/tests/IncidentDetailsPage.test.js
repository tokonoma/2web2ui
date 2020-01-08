import { mount } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import { IncidentDetailsPage } from '../IncidentDetailsPage';
import RelatedIncidents from '../components/RelatedIncidents';
import IncidentDetails from '../components/IncidentDetails';

jest.mock('react-router-dom');
Link.mockImplementation(() => 'breadcrumb link');

jest.mock('../components/IncidentDetails');
IncidentDetails.mockImplementation(() => <div data-id="incident-details"></div>);

jest.mock('../components/RelatedIncidents');
RelatedIncidents.mockImplementation(() => <div data-id="related-incidents"> </div>);

const mockIncident = {
  id: '123',
  resource: '1.2.3.4',
  blacklist_name: 'spamhaus.org - pbl',
  occurred_at: '2019-12-31T18:14:57.899Z',
  resolved_at: '2019-12-31T19:01:32.741Z',
  status: 'resolved',
};

const mockHistoricalIncidents = [
  {
    id: '1234',
    resource: '1.2.3.4',
    blacklist_name: 'spamhaus.org - pbl',
    occurred_at: '2019-12-31T18:14:57.899Z',
    resolved_at: '2019-12-31T19:01:32.741Z',
    status: 'resolved',
  },
];

const mockIncidentsForResource = [
  {
    id: '1234',
    resource: '1.2.3.4',
    blacklist_name: 'spamhaus.org 2',
    occurred_at: '2019-12-31T18:14:57.899Z',
    resolved_at: '2019-12-31T19:01:32.741Z',
    status: 'resolved',
  },
];

const mockIncidentsForBlacklist = [
  {
    id: '2345',
    resource: '2.3.4.5',
    blacklist_name: 'spamhaus.org - pbl',
    occurred_at: '2019-12-31T18:14:57.899Z',
    resolved_at: '2019-12-31T19:01:32.741Z',
    status: 'resolved',
  },
];

describe('IncidentDetailsPage', () => {
  const mockGetIncident = jest.fn(() => Promise.resolve(mockIncident));
  const mockListIncidentsForResource = jest.fn();
  const mockListIncidentsForBlacklist = jest.fn();
  const mockListHistoricalResolvedIncidents = jest.fn();

  const subject = ({ ...props }) => {
    const defaults = {
      id: mockIncident.id,
      getIncident: mockGetIncident,
      listIncidentsForResource: mockListIncidentsForResource,
      listIncidentsForBlacklist: mockListIncidentsForBlacklist,
      listHistoricalResolvedIncidents: mockListHistoricalResolvedIncidents,
    };
    return mount(<IncidentDetailsPage {...defaults} {...props} />);
  };

  it('fetches incident, similar incidents for resource and blacklist, and historical incidents on mount', async () => {
    const wrapper = subject({ loading: true });

    wrapper.update();

    expect(mockGetIncident).toHaveBeenCalledWith(mockIncident.id);
    wrapper.update();
    await mockGetIncident(mockIncident.id).then(() => {
      expect(mockListIncidentsForResource).toHaveBeenCalledWith(mockIncident.resource);
      expect(mockListIncidentsForBlacklist).toHaveBeenCalledWith(mockIncident.blacklist_name);
      expect(mockListHistoricalResolvedIncidents).toHaveBeenCalledWith(
        mockIncident.blacklist_name,
        mockIncident.resource,
      );
    });
  });

  it('renders the 3 panels once data has come back', () => {
    const wrapper = subject({
      loading: false,
      incident: mockIncident,
      incidentsForBlacklist: mockIncidentsForBlacklist,
      incidentsForResource: mockIncidentsForResource,
      historicalIncidents: mockHistoricalIncidents,
    });

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
