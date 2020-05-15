import React from 'react';
import { shallow } from 'enzyme';
import PercentDataCell from '../PercentDataCell';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('PercentDataCell', () => {
  const subject = (props = {}) => shallow(<PercentDataCell value={5} {...props} />);

  it('renders a percentage', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders bars', () => {
    expect(subject({ value: null })).toMatchSnapshot();
  });
});
