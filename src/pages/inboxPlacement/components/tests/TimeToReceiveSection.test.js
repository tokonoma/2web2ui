import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import TimeToReceiveSection from '../TimeToReceiveSection';

jest.mock('src/context/HibanaContext');

describe('AuthenticationResults: ', () => {
  beforeEach(() => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
  });

  const subject = (props = {}) => shallow(<TimeToReceiveSection {...props} />);

  it('should render the section with data', () => {
    const wrapper = subject({
      data: {
        under_3_minutes_pct: 0,
        under_6_minutes_pct: 0.3,
        under_15_minutes_pct: 0.4,
        under_60_minutes_pct: 0.1,
        over_60_minutes_pct: 0,
        never_pct: 0.2,
      },
    });
    expect(wrapper.find('PercentWheel[label="0-3 min"]').prop('value')).toEqual(0);
    expect(wrapper.find('PercentWheel[label="3-6 min"]').prop('value')).toEqual(0.3);
    expect(wrapper.find('PercentWheel[label="6-15 min"]').prop('value')).toEqual(0.4);
    expect(wrapper.find('PercentWheel[label="15-60 min"]').prop('value')).toEqual(0.1);
    expect(wrapper.find('PercentWheel[label="60+ min"]').prop('value')).toEqual(0);
    expect(wrapper.find('PercentWheel[label="Never"]').prop('value')).toEqual(0.2);
  });
});
