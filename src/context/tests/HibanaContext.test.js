import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HibanaProvider, HibanaConsumer, useHibana } from '../HibanaContext';

class MyClassComponent extends React.Component {
  render() {
    return (
      <HibanaConsumer>
        {({ isHibanaEnabled }) => (
          <>
            {isHibanaEnabled ? (
              <p>Hibana enabled in a class component!</p>
            ) : (
              <p>Hibana disabled in a class component!</p>
            )}
          </>
        )}
      </HibanaConsumer>
    );
  }
}

const MyFunctionalComponent = () => {
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
        <MyClassComponent />
        <MyFunctionalComponent />
      </HibanaProvider>,
    );

  it('renders with the initial state with Hibana disabled', () => {
    const { queryByText } = subject();

    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Hibana disabled in a class component!')).toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
    expect(queryByText('Hibana enabled in a class component!')).not.toBeInTheDocument();
  });

  it('updates Hibana state when dispatching the "ENABLE" and "DISABLE" action types', () => {
    const { queryByText } = subject();

    userEvent.click(queryByText('Enable Hibana'));

    expect(queryByText('Disable Hibana')).toBeInTheDocument();
    expect(queryByText('Hibana enabled in a class component!')).toBeInTheDocument();
    expect(queryByText('Enable Hibana')).not.toBeInTheDocument();
    expect(queryByText('Hibana disabled in a class component!')).not.toBeInTheDocument();

    userEvent.click(queryByText('Disable Hibana'));

    expect(queryByText('Enable Hibana')).toBeInTheDocument();
    expect(queryByText('Hibana disabled in a class component!')).toBeInTheDocument();
    expect(queryByText('Disable Hibana')).not.toBeInTheDocument();
    expect(queryByText('Hibana enabled in a class component!')).not.toBeInTheDocument();
  });
});
