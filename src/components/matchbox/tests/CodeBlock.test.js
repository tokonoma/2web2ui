import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import CodeBlock from '../CodeBlock';

jest.mock('src/context/HibanaContext');

describe('CodeBlock Matchbox component wrapper', () => {
  const subject = () =>
    shallow(
      <CodeBlock code="<h1>Test</h1>" to="/test">
        Children...
      </CodeBlock>,
    );

  it('renders the Hibana version of the CodeBlock component correctly when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaCodeBlock');
  });

  it('renders the OG version of the CodeBlock when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('CodeBlock');
  });
});
