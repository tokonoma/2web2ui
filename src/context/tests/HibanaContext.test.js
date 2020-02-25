import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HibanaProvider, useHibana } from '../HibanaContext';

const MyComponent = () => {
  const [state, dispatch] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <div>
      {isHibanaEnabled ? (
        <button onClick={() => dispatch({ type: 'DISABLE' })}>Disable Hibana</button>
      ) : (
        <button onClick={() => dispatch({ type: 'ENABLE' })}>Enable Hibana</button>
      )}

      <button onClick={() => dispatch({ type: 'UNEXPECTED_ACTION' })}>Unexpected Action</button>
    </div>
  );
};

describe('hibanaContext', () => {
  const subject = () =>
    render(
      <HibanaProvider>
        <MyComponent />
      </HibanaProvider>,
    );

  it('renders with the initial state with Hibana disabled', () => {
    const { queryByText } = subject();

    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
  });

  it('updates Hibana state when dispatching the "ENABLE" and "DISABLE" action types', () => {
    const { queryByText } = subject();

    userEvent.click(queryByText('Enable Hibana'));

    expect(queryByText('Enable Hibana')).not.toBeInTheDocument();
    expect(queryByText('Disable Hibana')).toBeInTheDocument();

    userEvent.click(queryByText('Disable Hibana'));

    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
  });
});
