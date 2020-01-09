import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import IncidentsCollection from '../IncidentsCollection';

describe('Blacklist Component: IncidentsCollection', () => {
  const now = new Date('2019-12-18T04:20:00-04:00');
  Date.now = jest.fn(() => now);
  const updateDateRange = jest.fn();
  const dateOptions = {
    from: new Date('2019-12-01T12:00:00.000Z'),
    to: new Date('2019-12-08T12:00:00.000Z'),
    dateRange: '7 days',
  };
  const incidents = [
    {
      id: 1,
      resource: '101.101',
      blacklist_name: 'spammy mcspamface',
      occurred_at_formatted: 'Dec 3 2019 at 10:00am',
      occurred_at_timestamp: 123456789,
    },
  ];
  const subject = ({ ...props }) => {
    const defaults = { incidents, dateOptions, updateDateRange };

    return render(
      <Router>
        <IncidentsCollection {...defaults} {...props} />
      </Router>,
    );
  };

  it('renders the rows correctly when incidents exist', () => {
    const { queryByText } = subject();
    expect(queryByText('101.101')).toBeInTheDocument();
    expect(queryByText('spammy mcspamface')).toBeInTheDocument();
    expect(queryByText('Dec 3 2019 at 10:00am')).toBeInTheDocument();
    expect(queryByText('Last 7 Days')).toBeInTheDocument();
  });

  it('renders the empty state when there are no incidents', () => {
    const { queryByText } = subject({ incidents: [] });
    expect(queryByText('There are no incidents for your date range selection')).toBeInTheDocument();
    expect(queryByText('Last 7 Days')).toBeInTheDocument();
  });
});
