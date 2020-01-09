import React from 'react';
import { shallow } from 'enzyme';
import VisualWebsiteOptimizer from '../VisualWebsiteOptimizer';
import getConfig from 'src/helpers/getConfig';

jest.mock('src/helpers/getConfig');

describe('Visual Website Optimizer', () => {
  const subject = () => shallow(<VisualWebsiteOptimizer />);

  beforeEach(() => {
    getConfig.mockReset();
  });

  it('does not add the script when the vwo config is enabled: false', () => {
    getConfig.mockReturnValue(false);
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('adds the script when the vwo config is enabled: true', () => {
    getConfig.mockReturnValue(true);
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });
});
