import React from 'react';
import GrantsCheckboxes from '../GrantsCheckboxes';
import { shallow } from 'enzyme';
jest.mock('src/hooks/useHibanaOverride', () => jest.fn(a => a));

describe('GrantsCheckboxes', () => {
  const props = {
    grants: [
      {
        key: 'grant1',
        label: 'Grant 1',
        description: 'desc for grant 1',
      },
      {
        key: 'grant2',
        label: 'Grant 2',
        description: 'desc for grant 2',
      },
    ],
    show: true,
  };

  it('should render', () => {
    const wrapper = shallow(<GrantsCheckboxes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
