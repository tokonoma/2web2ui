import React from 'react';
import SaveCSVButton from '../SaveCSVButton';
import _ from 'lodash';
import { shallow } from 'enzyme';
import Papa from 'papaparse';

jest.mock('papaparse');
Date.now = jest.fn(() => 1512509841582);

describe('Save CSV Button', () => {
  let wrapper;
  const props = {
    data: _.times(5, (i) => ({ key: i + 1 })),
    saveCsv: true
  };

  beforeEach(() => {
    Papa.unparse = jest.fn(() => 'mydata');
    wrapper = shallow(<SaveCSVButton {...props} />);
  });

  it('should render', () => {
    wrapper.setProps({ data: _.times(12, (i) => ({ key: i + 1 })) });
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show save as CSV button when false', () => {
    wrapper.setProps({ saveCsv: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with given button label', () => {
    wrapper.setProps({ caption: 'Click Me!' });
    expect(wrapper.dive().text()).toEqual('Click Me!');
  });

  it('should render with given download filename', () => {
    wrapper.setProps({ filename: 'NotAVirus.exe' });
    expect(wrapper).toHaveProp('download', 'NotAVirus.exe');
  });
});
