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
        <>
          <h1>Hibana is enabled.</h1>

          <button onClick={() => dispatch({ type: 'DISABLE' })}>Disable Hibana</button>
        </>
      ) : (
        <>
          <h1>Hibana is disabled.</h1>

          <button onClick={() => dispatch({ type: 'ENABLE' })}>Enable Hibana</button>
        </>
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

    expect(queryByText('Hibana is disabled.')).toBeInTheDocument();
    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Hibana is enabled.')).not.toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
  });

  it('updates Hibana state when dispatching the "ENABLE" and "DISABLE" action types', () => {
    const { queryByText } = subject();

    userEvent.click(queryByText('Enable Hibana'));

    expect(queryByText('Hibana is disabled.')).not.toBeInTheDocument();
    expect(queryByText('Enable Hibana')).not.toBeInTheDocument();
    expect(queryByText('Hibana is enabled.')).toBeInTheDocument();
    expect(queryByText('Disable Hibana')).toBeInTheDocument();

    userEvent.click(queryByText('Disable Hibana'));

    expect(queryByText('Hibana is disabled.')).toBeInTheDocument();
    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Hibana is enabled.')).not.toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
  });
});
