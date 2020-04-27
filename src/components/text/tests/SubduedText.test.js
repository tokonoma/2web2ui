import React from 'react';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
import SubduedText from '../SubduedText';

jest.mock('src/context/HibanaContext');

describe('SubduedText', () => {
  const subject = props => render(<SubduedText {...props} />);

  it('only renders with a limited set of props when Hibana is disabled', () => {
    useHibana.mockImplementation(() => [{ isHibanaEnabled: false }]);

    const { container, queryByTestId, queryByText } = subject({
      className: 'my-class',
      id: 'my-id',
      'data-id': 'my-component',
      children: <span>Hello, world.</span>,
    });
    const elByClass = container.querySelector('.my-class');
    const elById = container.querySelector('#my-id');

    expect(elByClass).toBeTruthy();
    expect(elById).toBeNull();
    expect(queryByTestId('my-component')).toBeInTheDocument();
    expect(queryByText('Hello, world.')).toBeInTheDocument();
  });

  it('renders with all passed in props when Hibana is enabled', () => {
    useHibana.mockImplementation(() => [{ isHibanaEnabled: true }]);

    const { container, queryByText, queryByTestId } = subject({
      as: 'h1',
      children: 'Hello, world.',
      'data-id': 'my-component',
    });
    const el = container.querySelector('h1');

    expect(el).toBeTruthy();
    expect(queryByTestId('my-component')).toBeInTheDocument();
    expect(queryByText('Hello, world.')).toBeInTheDocument();
  });
});
