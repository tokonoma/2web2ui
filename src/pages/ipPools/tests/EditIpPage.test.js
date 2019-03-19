import { shallow } from 'enzyme';
import React from 'react';
import { EditIpPage } from '../EditIpPage';

describe('IP Edit Page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      listPools: jest.fn(),
      pool: { name: 'My Pool', id: 'my-pool' },
      loading: false,
      ip: { external_ip: '1.1.1.1' },
      updateSendingIp: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      match: {
        params: {
          id: 'my-pool'
        }
      }
    };

    wrapper = shallow(<EditIpPage {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('loads data after mount', () => {
    expect(props.listPools).toHaveBeenCalledTimes(1);
  });

  it('renders loader when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });

  it('redirects loader when no ip', () => {
    wrapper.setProps({ ip: null });
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('Redirect')).toExist();
    expect(wrapper.find('Redirect').prop('to')).toEqual('/account/ip-pools/edit/my-pool');
  });

  it('invokes updateSendingIp function upon submitting the ip form', () => {
    wrapper.find('IpForm').simulate('submit', {});
    expect(props.updateSendingIp).toHaveBeenCalled();
  });

  it('renders error banner', () => {
    const err = new Error('API Failed');
    wrapper.setProps({ error: err });
    expect(wrapper.exists('ApiErrorBanner')).toBe(true);
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });

  it('reloads data on upon clicking on reload button on error banner', () => {
    const err = new Error('API Failed');
    wrapper.setProps({ error: err });
    wrapper.find('ApiErrorBanner').prop('reload')();
    expect(props.listPools).toHaveBeenCalled();
  });

  describe('onUpdateIp', () => {
    it('updates ip with ip pool data', async () => {
      await wrapper.instance().onUpdateIp({ ip_pool: 'foo' });
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', 'foo');
      expect(props.showAlert).toHaveBeenCalledTimes(1);
    });

    it('throws on error', async () => {
      const err = new Error('API Failed');
      props.updateSendingIp.mockReturnValue(Promise.reject(err));
      await expect(wrapper.instance().onUpdateIp({ ip_pool: 'bar' })).rejects.toThrow(err);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', 'bar');
      expect(props.showAlert).toHaveBeenCalledTimes(0);
    });
  });
});
