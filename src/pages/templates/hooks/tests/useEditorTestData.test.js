import React from 'react';
//import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useEditorTestData from '../useEditorTestData';

describe('useEditorTestData', () => {
  const useTestWrapper = (initialProps = {}) => {
    const props = {
      getTestData: () => {},
      ...initialProps
    };
    const TestComponent = () => <div hooked={useEditorTestData(props)} />;

    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns default values', () => {
    const wrapper = useTestWrapper();
    expect(useHook(wrapper)).toMatchSnapshot();
  });

  it('should hydrate', () => {
    const draft = { id: 'test-template' };
    const wrapper = useTestWrapper({ draft });
    const { parsedTestData } = useHook(wrapper);

    expect(parsedTestData).toEqual({
      metadata: {},
      options: {},
      substitution_data: {}
    });
  });

  it('should return merged data when test data is present', () => {
    const draft = { id: 'test-template' };
    const preExistingTestData = {
      substitution_data: { substitution: 'data' },
      metadata: { meta: 'data' },
      options: { foo: 'bar' }
    };
    const mockGetTestData = () => preExistingTestData;
    const wrapper = useTestWrapper({
      draft,
      getTestData: mockGetTestData
    });
    const { parsedTestData } = useHook(wrapper);
    expect(parsedTestData).toEqual(preExistingTestData);
  });

  it('should parse raw test data JSON', async () => {
    const draft = { id: 'my-template' };
    const exampleTestData = {
      substitution_data: { substitution: 'data' },
      metadata: { meta: 'data' },
      options: { foo: 'bar' }
    };
    const testData = JSON.stringify(exampleTestData);
    try {
      const wrapper = await useTestWrapper({
        draft,
        testData
      });
      const { parsedTestData } = useHook(wrapper);

      expect(parsedTestData).toEqual(exampleTestData);
    } catch (err) {
      return err;
    }
  });

  it('should return an empty object when parsing fails', async () => {
    const draft = { id: 'my-template' };
    const testData = '{"string}';

    try {
      const wrapper = await useTestWrapper({
        draft,
        testData
      });

      const { parsedTestData } = useHook(wrapper);

      expect(parsedTestData).toEqual({});
    } catch (err) {
      return err;
    }
  });
});
