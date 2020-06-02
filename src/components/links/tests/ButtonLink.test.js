import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonLink from '../ButtonLink';
import TestApp from 'src/__testHelpers__/TestApp';

describe('ButtonLink', () => {
  const subject = props =>
    render(
      <TestApp>
        <ButtonLink {...props} />
      </TestApp>,
    );

  it('renders with a the passed in click handler', () => {
    const mockClickHandler = jest.fn();
    const { queryByText } = subject({ children: 'Click Me', onClick: mockClickHandler });

    fireEvent.click(queryByText('Click Me'));

    expect(mockClickHandler).toBeCalled();
  });

  it('renders with the relevant role and href', () => {
    const { queryByRole } = subject({ children: 'Click Me', onClick: jest.fn() });

    expect(queryByRole('button')).toBeInTheDocument();
    expect(document.querySelector('[href="#"]')).toBeInTheDocument();
  });
});
