import React from 'react';
import { shallow } from 'enzyme';
import { domain } from '../../tests/helpers/domain';
import { DomainStatus } from '../DomainStatus';

describe('DomainStatus', () => {
  const subject = (props = {}) => shallow(
    <DomainStatus
      domain={domain}
      onShareDomainChange={() => {}}
      {...props}
    />
  );

  it('renders section', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders section with auto-verify banner', () => {
    expect(subject({ hasAutoVerifyEnabled: true })).toMatchSnapshot();
  });

  it('calls onShareDomainChange when access changes', () => {
    const onShareDomainChange = jest.fn();

    subject({ onShareDomainChange })
      .find('ShareWithSubaccounts')
      .simulate('change');

    expect(onShareDomainChange).toHaveBeenCalled();
  });
});
