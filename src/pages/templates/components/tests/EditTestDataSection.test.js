import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditTestDataSection from '../EditTestDataSection';

jest.mock('../../hooks/useEditorContext');

describe('EditTestDataSection', () => {
  const subject = (editorState) => {
    useEditorContext.mockReturnValue({
      setTestData: jest.fn(),
      testData: {
        options: {},
        metadata: {},
        substitution_data: {}
      },
      setContent: () => {},
      ...editorState
    });

    return shallow(<EditTestDataSection/>);
  };

  it('has an initial "value" that is derived from passed in "testData" editorContext', () => {
    const exampleTestData = {
      options: {
        option: true
      },
      metadata: {
        meta: 'data'
      },
      substitution_data: {
        substitution: 'data'
      }
    };
    const wrapper = subject({ testData: exampleTestData });

    expect(wrapper).toHaveProp('value', exampleTestData);
  });

  it('invokes the "setTestData" function on change', () => {
    const mockSetTestData = jest.fn();
    const wrapper = subject({ setTestData: mockSetTestData });

    wrapper.simulate('change');

    expect(mockSetTestData).toHaveBeenCalled();
  });
});
