import React from 'react';
import Providers from 'src/providers';
import { render } from '@testing-library/react';
import CongratsBanner from '../CongratsBanner';

describe('Blacklist Component: CongratsBanner', () => {
  const mockDismiss = jest.fn();
  const subject = ({ ...props }) => {
    const defaults = { mockDismiss };

    return render(
      <Providers>
        <CongratsBanner {...defaults} {...props} />
      </Providers>,
    );
  };

  it('renders the banner correctly', () => {
    const { queryByText } = subject();
    expect(
      queryByText('Congratulations! You are not currently on a Blacklist'),
    ).toBeInTheDocument();
  });

  it('renders the content correctly', () => {
    const { queryByText } = subject({ content: 'Testing 123' });
    expect(queryByText('Testing 123')).toBeInTheDocument();
  });

  it('renders the title correctly', () => {
    const { queryByText } = subject({ title: 'Testing Title' });
    expect(queryByText('Testing Title')).toBeInTheDocument();
  });
});
