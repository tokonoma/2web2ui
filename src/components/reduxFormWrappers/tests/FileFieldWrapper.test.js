import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';

import { OGFileFieldWrapper, HibanaFileFieldWrapper } from '../FileFieldWrapper';

cases(
  'FileFieldWrapper',
  props => {
    const defaults = {
      fileType: 'csv',
      input: {},
      label: 'Test File Input',
      meta: {
        touched: false,
      },
      required: true,
    };
    const wrapper = shallow(<OGFileFieldWrapper {...defaults} {...props} />);
    expect(wrapper).toMatchSnapshot();
    const hibanaWrapper = shallow(<HibanaFileFieldWrapper {...defaults} {...props} />);
    expect(hibanaWrapper).toMatchSnapshot();
  },
  {
    'renders file input': {},
    'renders file input with no specified type': {
      fileType: undefined,
    },
    'renders file input with selected filename': {
      input: {
        value: {
          name: 'test.csv',
          size: 999,
        },
      },
    },
    'renders file input with multiple allowed file types': {
      fileType: undefined,
      fileTypes: ['.txt,.csv'],
      input: {
        value: {
          name: 'test.txt',
          size: 999,
        },
      },
    },
    'renders disabled file input': {
      disabled: true,
    },
    'renders file input with error message': {
      meta: {
        error: 'Oh no!',
        touched: true,
      },
    },
    'renders file input with help message': {
      helpText: 'Ask Google!',
    },
    'renders with a hidden label': {
      labelHidden: true,
      required: true,
      label: 'a label',
    },
  },
);
