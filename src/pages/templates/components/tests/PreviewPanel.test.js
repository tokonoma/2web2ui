import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import PreviewPanel from '../PreviewPanel';

describe('PreviewPanel', () => {
  it('renders blank panel', () => {
    const wrapper = shallow(<PreviewPanel />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders HTML content by default', () => {
    const html = '<!DOCTYPE html>';
    const wrapper = shallow(<PreviewPanel html={html} />);

    expect(wrapper.find('PreviewFrame')).toHaveProp('content', html);
  });

  it('renders AMP HTML content when tab is clicked', () => {
    const ampHtml = '<html ⚡>';
    const TestPreviewFrame = () => null; // stub frame for a safe mount
    const wrapper = mount(<PreviewPanel ampHtml={ampHtml} Frame={TestPreviewFrame} />);

    act(() => {
      wrapper
        .find('Tabs')
        .prop('tabs')
        .find(({ key }) => key === 'ampHtml')
        .onClick();
    });

    wrapper.update();

    expect(wrapper.find('TestPreviewFrame')).toHaveProp('content', ampHtml);
    expect(wrapper.find('TestPreviewFrame')).toHaveProp('strict', false);
  });
});
