import React from 'react';
import { shallow } from 'enzyme';
import IntegrationPageFilter from '../IntegrationPageFilter';
import { TextField } from '@sparkpost/matchbox';
const defaultProps = {
  onChange: jest.fn(),
  disabled: false,
  initialValues: {
    batchIds: [],
    batchStatus: []
  }
};
const wrapper = shallow(<IntegrationPageFilter {...defaultProps}/>);
describe(('IntegrationFilter: '),() => {
  it('should render correctly',() => {
    expect(wrapper).toMatchSnapshot();
  });
  it('textfield should initialize with initialvalues', () => {
    wrapper.setProps({ initialValues: {
      batchIds: ['test','ids'],
      batchStatus: []
    }});
    expect(wrapper.find(TextField)).toHaveProp('defaultValue','test,ids');
  });
});
