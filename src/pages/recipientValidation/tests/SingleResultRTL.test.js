import React from 'react';
import { render } from '@testing-library/react';
import { SingleResult } from '../SingleResult';

describe('SingleResult', () => {
  // eslint-disable-next-line
  const subject = props => {
    const defaultProps = {
      singleResults: {
        result: 'valid',
        valid: true,
        reason: 'Invalid Domain',
        is_role: false,
        is_disposable: false,
        is_free: false,
        did_you_mean: 'harry.potter@hogwarts.edu',
        email: 'harry.potter@hogwarts.com',
      },
      singleAddress: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    const mergedProps = Object.assign(defaultProps, props);

    return render(<SingleResult {...mergedProps} />);
  };
});
