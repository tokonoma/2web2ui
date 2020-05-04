import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import RecipientValidationPriceTable from '../RecipientValidationPriceTable';
import styles from '../RecipientValidationPriceTable.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('RecipientValidationTable', () => {
  beforeEach(() => {
    useHibanaOverride.mockImplementationOnce(() => styles);
  });

  it('should render correctly', () => {
    const wrapper = shallow(<RecipientValidationPriceTable />);
    expect(wrapper).toMatchSnapshot();
  });
});
