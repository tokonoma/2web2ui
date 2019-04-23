import React from 'react';
import { mount } from 'enzyme';

import PreviewFrame from '../PreviewFrame';

describe('PreviewFrame', () => {
  const testContent = '<h1>Hello, World!</h1>';
  const createWrapper = ({ content, contentDocument = {}, strict }) => {
    // This is an experimental way to mock a class method
    // @see https://github.com/facebook/react/issues/9396
    class MockPreviewFrame extends PreviewFrame {
      // Must set the display name for snapshots
      static displayName = 'PreviewFrame';

      // Mock setting iframe ref
      // @note Tried mocking contentWindow with jsdom, but didn't provide add value, so removed dep
      setRef = (iframe) => {
        this.iframe = {
          contentDocument: {
            close: jest.fn(),
            getElementsByTagName: jest.fn(() => []),
            open: jest.fn(),
            write: jest.fn(),
            ...contentDocument
          }
        };
      }
    }

    return mount(<MockPreviewFrame content={content} strict={strict} />);
  };


  it('renders an iframe', () => {
    const wrapper = createWrapper({ content: testContent });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an iframe with flexible policies', () => {
    const wrapper = createWrapper({ content: testContent, strict: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('writes content to iframe document', () => {
    const write = jest.fn();
    createWrapper({ content: testContent, contentDocument: { write }});
    expect(write).toHaveBeenCalledWith(testContent);
  });

  it('sets iframe height after it loads', () => {
    const wrapper = createWrapper({
      content: testContent,
      contentDocument: {
        body: {
          offsetHeight: '94',
          scrollHeight: '94'
        },
        documentElement: {
          clientHeight: '94',
          offsetHeight: '94',
          scrollHeight: '94'
        }
      }
    });

    wrapper.instance().onLoad();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
