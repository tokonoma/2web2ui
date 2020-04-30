import React from 'react';
import { shallow } from 'enzyme';
import EventTypeFilters from '../EventTypeFilters';
jest.mock('src/hooks/useHibanaOverride', () => jest.fn(a => a));

describe('EventTypeFilters', () => {
  let props;

  beforeEach(() => {
    props = {
      eventTypeDocs: [
        { type: 'amp_open', displayName: 'AMP Open', description: 'AMP open desc' },
        { type: 'bounce', displayName: 'Bounce', description: 'Bounce desc' },
      ],
      onChange: jest.fn(),
    };
  });

  it('should render from a list of event types', () => {
    const wrapper = shallow(<EventTypeFilters {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
