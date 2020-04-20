import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import PercentWheel from '../PercentWheel';

jest.mock('src/context/HibanaContext');

describe('PercentWheel', () => {
  beforeEach(() => useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]));

  const subject = (props = {}) => shallow(<PercentWheel {...props} />);

  it('should render with no data', () => {
    expect(subject({ color: '#123456', backgroundColor: '#fff' })).toMatchSnapshot();
  });

  it('should render with the correct label and value', () => {
    const wrapper = subject({ label: 'my label', value: 0.034, backgroundColor: '#fff' });

    expect(wrapper.find('div[name="percentWheel_label"]').text()).toEqual('my label');
    expect(wrapper.find('div[name="percentWheel_value"]').text()).toEqual('3.4%');
  });
});
