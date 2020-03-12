import React from 'react';
import Banner from '../Banner.js';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  Banner: () => <div>default progress bar</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Banner: () => <div>hibana progress bar</div>,
}));
describe('Banner', () => {
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = render(<Banner />);
    expect(queryByText('hibana progress bar')).toBeInTheDocument();
    expect(queryByText('default progress bar')).not.toBeInTheDocument();
  });
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = render(<Banner />);
    expect(queryByText('hibana progress bar')).not.toBeInTheDocument();
    expect(queryByText('default progress bar')).toBeInTheDocument();
  });
});
