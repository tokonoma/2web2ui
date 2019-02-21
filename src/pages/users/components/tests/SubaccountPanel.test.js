import React from 'react';
import { shallow } from 'enzyme';

import SubaccountPanel from '../SubaccountPanel';

describe('Component: EditForm', () => {
  const baseProps = {
    subaccount: { name: 'cletus', id: 43 }
  };

  function subject(props) {
    return shallow(<SubaccountPanel {...baseProps} {...props} />);
  }

  it('should render', () => {
    expect(subject()).toMatchSnapshot();
  });
});
