import React from 'react';
import { shallow } from 'enzyme';

import PreviewPanel from '../PreviewPanel';

const props = {
  html: '<h1>Test Template</h1>',
  text: 'Test Template'
};

it('renders blank panel', () => {
  const wrapper = shallow(<PreviewPanel />);
  expect(wrapper).toMatchSnapshot();
});

it('renders HTML by default', () => {
  const wrapper = shallow(<PreviewPanel {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders text on tab click', () => {
  const wrapper = shallow(<PreviewPanel {...props} />);

  wrapper
    .find('Tabs')
    .prop('tabs')
    .find(({ content }) => content === 'Text')
    .onClick({ currentTarget: { text: 'Text' }});

  expect(wrapper).toMatchSnapshot();
});
