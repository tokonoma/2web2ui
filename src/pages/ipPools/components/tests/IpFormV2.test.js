import React from 'react';
import renderWithRedux from 'src/__testHelpers__/renderWithRedux';
import { IpForm } from '../IpForm';
import ipPools from 'src/reducers/ipPools';
jest.mock('redux-form/lib/Field', () => 'div');

describe('The edit IP form', () => {
  const subject = props => {
    const defaultProps = {
      currentPool: {
        name: 'Current Pool',
        id: 'current-pool',
      },
      pool: { id: 'my-pool' },
      ip: {
        hostname: 'abcd.com',
        auto_warmup_stage: 2,
        auto_warmup_enabled: true,
      },
      pools: [
        {
          name: 'First Pool',
          id: 'first-pool',
        },
      ],
    };
    return renderWithRedux({
      component: <IpForm {...defaultProps} {...props} />,
      initialState: { list: [], pool: {} },
      reducer: ipPools,
    });
  };

  it('debugs', () => {
    const { debug } = subject();

    debug();
  });
});
