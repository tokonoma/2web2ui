import { shallow } from 'enzyme';
import React from 'react';
import { IpList } from '../IPList';

describe('IP List tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      ips: [
        { external_ip: '1.1.1.1', hostname: 'foo.com' },
        { external_ip: '1.1.2.2', hostname: 'bar.com' },
        { external_ip: '1.1.2.3' }
      ],
      pool: {
        id: 'foopool'
      }
    };

    wrapper = shallow(<IpList {...props} />);
  });

  it('renders with ips', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('renders nothing when no ip exists', () => {
    wrapper.setProps({ ips: []});
    expect(wrapper.type()).toBeNull();
  });

  it('should render row properly', () => {
    const rows = wrapper.instance().getRowData(props.ips[0]);
    expect(rows).toMatchSnapshot();
  });
});
