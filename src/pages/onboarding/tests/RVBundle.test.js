import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RVBundlePage from '../RVBundlePage';
import { BrowserRouter as Router } from 'react-router-dom';
import Providers from 'src/providers';

describe('RVBundlePage', () => {
  const subject = () =>
    render(
      <Providers>
        <Router>
          <RVBundlePage />
        </Router>
      </Providers>,
    );

  it('should render the modal on clicking "See Pricing"', () => {
    const { queryByText } = subject();
    expect(queryByText('Pay-As-You-Go Pricing')).not.toBeInTheDocument();
    userEvent.click(queryByText('See Pricing'));
    expect(queryByText('Pay-As-You-Go Pricing')).toBeInTheDocument();
  });
});
