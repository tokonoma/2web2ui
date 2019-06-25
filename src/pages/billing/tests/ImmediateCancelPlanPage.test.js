import React from 'react';
import { shallow } from 'enzyme';

import { ImmediateCancelPlanPage } from '../ImmediateCancelPlanPage';

jest.mock('src/helpers/conversionTracking');

describe('Component: ImmediateChangePlanPage', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      history: { push: jest.fn() },
      cancelAccount: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn()
    };
    wrapper = shallow(<ImmediateCancelPlanPage {...props} />);
  });

  it('should handle plan change immediately', async () => {
    await wrapper;
    expect(props.cancelAccount).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/account/billing');
    expect(props.showAlert).toHaveBeenCalledWith({
      message: 'Your account has been cancelled.',
      type: 'success'
    });
  });

  it('should render error page if cannot cancel', async () => {
    props.cancelAccount = jest.fn(() => Promise.reject({ message: 'Error message' }));
    wrapper = shallow(<ImmediateCancelPlanPage {...props}/>);
    await wrapper;

    expect(props.cancelAccount).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

});
