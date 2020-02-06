import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RelatedIncidents from '../RelatedIncidents';

const mixedIncidents = [
  {
    id: '1234',
    resource: '1.2.3.4',
    blacklist_name: 'spamhaus.org - sbl',
    occurred_at: '2019-07-23T12:48:00.000Z',
    resolved_at: '2019-07-23T13:48:00.000Z',
    status: 'resolved',
  },
  {
    id: '2345',
    resource: '2.3.4.5',
    blacklist_name: 'spamhaus.org 2 - sbl',
    occurred_at: '2019-07-23T12:48:00.000Z',
    status: 'active',
  },
];

const activeIncidents = [
  {
    id: '2345',
    resource: '2.3.4.5',
    blacklist_name: 'spamhaus.org 2 - sbl',
    occurred_at: '2019-07-23T12:48:00.000Z',
    status: 'active',
  },
];

describe('Blacklist Component: RelatedIncidents', () => {
  const subject = ({ ...props }) => {
    const defaults = { incidents: [], header: '', type: 'blacklist' };

    return render(
      <Router>
        <RelatedIncidents {...defaults} {...props} />
      </Router>,
    );
  };

  it('renders the header in the table', () => {
    const { queryByText } = subject({ header: 'Recent spamhaus.org - pbl Incidents' });
    expect(queryByText('Recent spamhaus.org - pbl Incidents')).toBeInTheDocument();
  });

  it('renders the resource name of incidents when type is blacklist', () => {
    const { queryByText } = subject({ incidents: mixedIncidents });
    expect(queryByText('1.2.3.4')).toBeInTheDocument();
  });

  it('renders the blacklist name of incidents when type is resource', () => {
    const { queryByText } = subject({ incidents: mixedIncidents, type: 'resource' });
    expect(queryByText('spamhaus.org - sbl')).toBeInTheDocument();
  });

  it('hides the resolved column when there are no incidents', () => {
    const { queryByText } = subject();
    expect(queryByText('Resolved')).not.toBeInTheDocument();
  });

  it('renders the resolved column as active for active incident', () => {
    const { queryByText } = subject({ incidents: activeIncidents });
    expect(queryByText('Active')).toBeInTheDocument();
  });
});
