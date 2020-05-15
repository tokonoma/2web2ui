import { shallow } from 'enzyme';
import React from 'react';
import Actions from '../Actions';

jest.mock('src/hooks/useHibanaOverride', () => state => state);

describe('Signals Recommended Actions Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      actions: [
        { content: 'foo', link: 'http://google.com' },
        { content: 'bar', type: 'good' },
        { content: 'baz', type: 'warning' },
        {
          content: 'lorem',
          type: 'bad',
          link: '/internal',
          internal: true,
          linkText: 'View Internal Link',
        },
      ],
      date: new Date('2018-01-01'),
      empty: false,
    };
    wrapper = shallow(<Actions {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('Action').forEach(node => {
      expect(node.dive()).toMatchSnapshot();
    });
  });

  it('renders empty state when empty', () => {
    wrapper.setProps({ empty: true });
    expect(wrapper).toMatchSnapshot();
  });
});
