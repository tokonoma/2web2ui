import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import AuthenticationResults from '../AuthenticationResults';

jest.mock('src/context/HibanaContext');

describe('AuthenticationResults: ', () => {
  beforeEach(() => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
  });

  const subject = (props = {}) => shallow(<AuthenticationResults {...props} />);

  it('should render the section with data', () => {
    const wrapper = subject({
      data: {
        spf_pct: 0.3,
        dkim_pct: 0.4,
        dmarc_pct: 0.1,
      },
    });
    expect(wrapper.find('PercentWheel[label="SPF"]').prop('value')).toEqual(0.3);
    expect(wrapper.find('PercentWheel[label="DKIM"]').prop('value')).toEqual(0.4);
    expect(wrapper.find('PercentWheel[label="DMARC"]').prop('value')).toEqual(0.1);
  });
});
