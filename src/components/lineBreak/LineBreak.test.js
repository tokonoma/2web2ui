import React from 'react';
import { shallow } from 'enzyme';
import LineBreak from '../LineBreak';

describe('LineBreak', () => {
  const subject = (props = {}) => shallow(
    <LineBreak text='Testing' {...props} />
  );

  it('renders line break with centered text', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders line break with left aligned text', () => {
    expect(subject({ align: 'left' })).toHaveProp('className', 'left');
  });

  it('renders line break with right aligned text', () => {
    expect(subject({ align: 'right' })).toHaveProp('className', 'right');
  });

  it('renders bare line break', () => {
    expect(subject({ text: '' })).toHaveDisplayName('hr');
  });
});
