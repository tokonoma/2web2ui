import React from 'react';
import { render } from '@testing-library/react';
import SignupModal from '../SignupModal';
import useRouter from 'src/hooks/useRouter';

jest.mock('src/hooks/useRouter');

describe('SignupModal', () => {
  const subject = (routerContext = {}) => {
    useRouter.mockReturnValue({
      location: {
        state: undefined,
      },
      ...routerContext,
    });
    return render(<SignupModal />);
  };

  it('does not show modal by default', () => {
    const { queryByText } = subject();
    expect(queryByText('Sign Up Complete!')).not.toBeInTheDocument();
  });

  it('shows modal content if coming from onboarding page', () => {
    const { queryByText } = subject({
      location: {
        state: {
          fromOnboarding: true,
        },
      },
    });
    expect(queryByText('Sign Up Complete!')).toBeInTheDocument();
  });
});
