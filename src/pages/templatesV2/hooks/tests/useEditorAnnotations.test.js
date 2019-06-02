import React from 'react';
import { mount } from 'enzyme';
import ampValidator from 'third/ampValidator';
import useEditorAnnotations from '../useEditorAnnotations';

jest.mock('third/ampValidator');

describe('useEditorAnnotations', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditorAnnotations({ content: {}, ...value })} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns amp validation errors', () => {
    ampValidator.renderErrorMessage = jest.fn(() => 'Oh no!');
    ampValidator.validateString = jest.fn(() => ({ errors: [{ line: 123 }]}));
    const wrapper = useTestWrapper({
      content: { amp_html: '<html ⚡4email>' },
      debounceEvent: jest.fn((fn) => fn())
    });

    expect(useHook(wrapper)).toEqual({
      annotations: {
        amp_html: [{ line: 123, message: 'Oh no!' }],
        html: [],
        text: []
      }
    });
  });

  it('ignores errors caused by substitution data', () => {
    ampValidator.renderErrorMessage = jest.fn(() => (
      'The attribute \'src\' in tag \'AMP-IMG (AMP4EMAIL)\' invalid value \'https://example.com/{{company}}.jpg\'.'
    ));
    ampValidator.validateString = jest.fn(() => ({ errors: [{ line: 123 }]}));
    const wrapper = useTestWrapper({
      content: { amp_html: '<html ⚡4email>' },
      debounceEvent: jest.fn((fn) => fn())
    });
    const state = useHook(wrapper);

    expect(state.annotations.amp_html).toEqual([]);
  });

  it('cancels remaining debounced calls', () => {
    const debounceEvent = jest.fn();
    debounceEvent.cancel = jest.fn();
    const wrapper = useTestWrapper({ debounceEvent });

    wrapper.unmount();

    expect(debounceEvent.cancel).toHaveBeenCalled();
  });
});
