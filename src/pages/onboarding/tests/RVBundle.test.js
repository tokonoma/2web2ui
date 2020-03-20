import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from 'src/__testHelpers__/TestApp';
import RVBundlePage from '../RVBundlePage';

describe('RVBundlePage', () => {
  const subject = () =>
    render(
      <TestApp>
        <RVBundlePage />
      </TestApp>,
    );

  it('should render the modal on clicking "See Pricing"', () => {
    const { queryByText } = subject();
    expect(queryByText('Pay-As-You-Go Pricing')).not.toBeInTheDocument();
    userEvent.click(queryByText('See Pricing'));
    expect(queryByText('Pay-As-You-Go Pricing')).toBeInTheDocument();
  });
});
