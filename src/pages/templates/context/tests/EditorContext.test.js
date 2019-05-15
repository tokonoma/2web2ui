import React from 'react';
import { shallow } from 'enzyme';
import { EditorContextProvider } from '../EditorContext';

describe('EditorContext', () => {
  describe('EditorContextProvider', () => {
    const subject = ({ value } = {}) => shallow(
      <EditorContextProvider value={value}>
        <div>Children</div>
      </EditorContextProvider>
    );

    it('renders children wrapped by a context provider', () => {
      expect(subject()).toMatchSnapshot();
    });

    it('sets provider value from props', () => {
      const value = { test: 'example' };
      const wrapper = subject({ value });

      expect(wrapper).toHaveProp('value', value);
    });
  });
});
