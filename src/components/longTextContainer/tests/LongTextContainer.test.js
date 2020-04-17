import React from 'react';
import LongTextContainer from '../LongTextContainer';
import { shallow } from 'enzyme';
jest.mock('src/hooks/useHibanaOverride', () => jest.fn(a => a));

describe('Long Text Container: ', () => {
  it('should render', () => {
    const wrapper = shallow(<LongTextContainer text={'foo'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
