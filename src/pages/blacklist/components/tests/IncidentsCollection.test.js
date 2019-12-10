import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import IncidentsCollection from '../IncidentsCollection';

describe('Blacklist Component: IncidentsCollection', () => {
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
    const defaults = { incidents };

    return render(
      <Router>
        <IncidentsCollection {...defaults} {...props} />
      </Router>,
    );
  };

  it('renders the rows correctly', () => {
    const { queryByText } = subject();
    expect(queryByText('101.101')).toBeInTheDocument();
    expect(queryByText('spammy mcspamface')).toBeInTheDocument();
    expect(queryByText('Dec 3 2019 at 10:00am')).toBeInTheDocument();
  });
});
