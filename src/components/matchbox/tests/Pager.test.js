import React from 'react';
import Pager from '../Pager';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  Pager: () => <div>default pager</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Pager: () => <div>hibana pager</div>,
}));

describe('Pager', () => {
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = render(<Pager />);

    expect(queryByText('hibana pager')).toBeInTheDocument();
    expect(queryByText('default pager')).not.toBeInTheDocument();
  });

  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = render(<Pager />);

    expect(queryByText('hibana pager')).not.toBeInTheDocument();
    expect(queryByText('default pager')).toBeInTheDocument();
  });
});
