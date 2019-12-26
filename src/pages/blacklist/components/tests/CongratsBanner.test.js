import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import CongratsBanner from '../CongratsBanner';

describe('Blacklist Component: CongratsBanner', () => {
  const mockDismiss = jest.fn();
  const subject = ({ ...props }) => {
    const defaults = { mockDismiss };

    return render(
      <Router>
        <CongratsBanner {...defaults} {...props} />
      </Router>,
    );
  };

  it('renders the banner correctly', () => {
    const { queryByText } = subject();
    expect(
      queryByText('Congratulations! You are not currently on a Blacklist'),
    ).toBeInTheDocument();
  });
});
