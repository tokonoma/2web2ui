import React from 'react';
import { shallow } from 'enzyme';
import { CancellationPanel } from '../CancellationPanel';

describe('CancellationPanel', () => {
  let props;
  let wrapper;

  const subject = (props) => shallow(<CancellationPanel {...props}/>);
  beforeEach(() => {
    props = {
      account: {
        pending_cancellation: null
      }
    };

    wrapper = shallow(<CancellationPanel {...props}/>);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders renew button when pending cancellation ', () => {
    props.account.pending_cancellation = { effective_date: '2019-07-20T00:00:00.000Z' };
    wrapper = subject(props);
    expect(wrapper).toMatchSnapshot();
  });
});
