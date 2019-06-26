import React from 'react';
import { shallow } from 'enzyme';

import { ImmediateCancelAccountPage } from '../ImmediateCancelAccountPage';

jest.mock('src/helpers/conversionTracking');

describe('Component: ImmediateCancelAcocutPage', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      history: { push: jest.fn() },
      cancelAccount: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn()
    };
    wrapper = shallow(<ImmediateCancelAccountPage {...props} />);
  });

  it('should handle account cancellation immediately', async () => {
    await wrapper;
    expect(props.cancelAccount).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/account/billing');
    expect(props.showAlert).toHaveBeenCalledWith({
      message: 'Your plan is set to be cancelled.',
      type: 'success'
    });
  });

  it('should render error page if cannot cancel', async () => {
    props.cancelAccount = jest.fn(() => Promise.reject({ message: 'Error message' }));
    wrapper = shallow(<ImmediateCancelAccountPage {...props}/>);
    await wrapper;

    expect(props.cancelAccount).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

});
