import React from 'react';
import CenteredLogo, { OGCenteredLogo } from '../CenteredLogo';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { shallow } from 'enzyme';

jest.mock('src/hooks/useHibanaToggle');
useHibanaToggle.mockReturnValue(OGCenteredLogo);

describe(' Component: Centered Logo', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {};
    wrapper = shallow(<CenteredLogo {...props} />);
  });

  it('renders sparkpost logo', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders aws marketplace logo (along with sparkpost)', () => {
    wrapper.setProps({ showAwsLogo: true });
    expect(wrapper).toMatchSnapshot();
  });
});
