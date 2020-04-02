import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PrecisionSelector from '../PrecisionSelector';
import { HibanaProvider } from 'src/context/HibanaContext';

describe('PrecisionSelector', () => {
  const mockChangeTime = jest.fn();
  const defaults = {
    from: '2019-02-16T12:00:00',
    to: '2019-02-17T12:00:00',
    changeTime: mockChangeTime,
    selectedPrecision: 'hour',
  };
  const subject = ({ ...props }) => {
    return render(
      <HibanaProvider>
        <PrecisionSelector {...defaults} {...props} />
      </HibanaProvider>,
    );
  };

  it('renders selection options correctly', () => {
    const { queryByText } = subject();
    expect(queryByText('5 Min')).toBeInTheDocument();
    expect(queryByText('15 Min')).toBeInTheDocument();
    expect(queryByText('Hour')).toBeInTheDocument();
    expect(queryByText('Day')).toBeInTheDocument();
  });

  it('changing precision triggers the onChange', () => {
    const { queryByTestId } = subject();
    const target = queryByTestId('precision-selector');
    fireEvent.change(target, {
      target: { value: 'hour' },
    });
    expect(mockChangeTime).toHaveBeenCalledWith(expect.objectContaining({ precision: 'hour' }));
    expect(target).toHaveValue('hour');
  });

  it('date changes that make the current precision unavailable triggers a change in precision', () => {
    const { queryByTestId, rerender } = subject({ selectedPrecision: '5min' });
    const target = queryByTestId('precision-selector');
    expect(target).toHaveValue('5min');
    rerender(
      <HibanaProvider>
        <PrecisionSelector {...defaults} from="2019-01-16T12:00:00" />
      </HibanaProvider>,
    );
    expect(mockChangeTime).toHaveBeenCalledWith(expect.objectContaining({ precision: 'day' }));
    expect(target).toHaveValue('day');
  });
});
