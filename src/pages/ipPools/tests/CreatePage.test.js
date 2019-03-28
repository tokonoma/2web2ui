import { shallow } from 'enzyme';
import React from 'react';
import { CreatePage } from '../CreatePage';

describe('IP Pools Create Page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      createPool: jest.fn(() => Promise.resolve()),
      listPools: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      history: {
        push: jest.fn()
      },
      loading: false
    };

    wrapper = shallow(<CreatePage {...props} />);
  });

  it('should render the list page correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show loading component when data is loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('should show an alert on successful pool creation', async () => {
    await wrapper.instance().createPool({ name: 'my-pool' });
    expect(wrapper.instance().props.showAlert).toHaveBeenCalledWith({
      type: 'success',
      message: 'Created IP pool my-pool.'
    });
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });

  it('lists pools and get pool on mount', () => {
    expect(props.listPools).toHaveBeenCalledTimes(1);
  });

  it('renders error on listError', () => {
    const error = new Error('network error');
    wrapper.setProps({ listError: error });
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });

  it('loads list data upon clicking reload button on ApiErrorBanner', () => {
    const error = new Error('network error');
    wrapper.setProps({ listError: error });
    props.listPools.mockClear();
    wrapper.find('ApiErrorBanner').prop('reload')();
    expect(props.listPools).toHaveBeenCalledTimes(1);
  });
});
