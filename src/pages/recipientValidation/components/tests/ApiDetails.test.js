import { shallow } from 'enzyme';
import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import { ApiIntegrationDocs } from '../ApiDetails';
import styles from '../ApiDetails.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('ApiDetails tab', () => {
  beforeEach(() => {
    useHibanaOverride.mockImplementationOnce(() => styles);
  });

  it('should render page correctly', () => {
    const wrapper = shallow(<ApiIntegrationDocs />);
    expect(wrapper).toMatchSnapshot();
  });
});
