import React from 'react';
//import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useEditorTestData from '../useEditorTestData';

describe('useEditorTestData', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditorTestData(value)} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns default values', () => {
    const wrapper = useTestWrapper();

    expect(useHook(wrapper)).toEqual({
      testData: undefined,
      setTestData: expect.any(Function)
    });
  });

  it('does not call `getRecipientList` when the `draft` is undefined', () => {
    const getSnippet = jest.fn();
    const draft = undefined;

    useTestWrapper({
      getSnippet,
      draft
    });

    expect(getSnippet).not.toHaveBeenCalled();
  });

  // TODO: Can't get this to work? The test will pass, but keep getting:
  /*
    Cannot log after tests are done. Did you forget to wait for something async in your test?
    Attempted to log "Error: Warning: An update to %s inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      // fire events that update state
    });
    // assert on the output
  */
  // it('updates test data via `getRecipientList` when the draft state changes', async () => {
  //   const getRecipientList = jest.fn(() => Promise.resolve({
  //     recipients: [
  //       {
  //         id: 'foo',
  //         substitution_data: {
  //           hello: 'world'
  //         },
  //         metadata: {
  //           foo: 'bar'
  //         }
  //       }
  //     ]
  //   }));

  //   const wrapper = useTestWrapper({
  //     getRecipientList,
  //     draft: {
  //       options: {
  //         option: true
  //       }
  //     }
  //   });

  //   expect(getRecipientList).toHaveBeenCalled();
  //   expect(wrapper.testData).toBe({
  //     substitution_data: {
  //       hello: 'world'
  //     },
  //     metadata: {
  //       foo: 'bar'
  //     },
  //     options: {
  //       option: true
  //     }
  //   });
  // });
});
