import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ActiveLabel from '../ActiveLabel';

jest.mock('src/context/HibanaContext');

describe('ActiveLabel: ', () => {
  const props = {
    name: 'name',
    value: '123',
  };

  it('should render the OG version', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(<ActiveLabel {...props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render the Hibana version', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = shallow(<ActiveLabel {...props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
