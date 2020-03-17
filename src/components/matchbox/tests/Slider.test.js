import React from 'react';
import Slider from '../Slider.js';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  Slider: () => <div>default slider</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Slider: () => <div>hibana slider</div>,
}));

describe('Slider', () => {
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = render(<Slider />);
    expect(queryByText('hibana slider')).toBeInTheDocument();
    expect(queryByText('default slider')).not.toBeInTheDocument();
  });
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = render(<Slider />);
    expect(queryByText('hibana slider')).not.toBeInTheDocument();
    expect(queryByText('default slider')).toBeInTheDocument();
  });
});
