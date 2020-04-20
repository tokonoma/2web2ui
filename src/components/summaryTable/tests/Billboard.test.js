import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Billboard from '../Billboard';

jest.mock('src/context/HibanaContext');

describe('Billboard', () => {
  it('renders signle cell table row', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(
      <Billboard colSpan={7}>
        <h1>Test Example</h1>
      </Billboard>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
