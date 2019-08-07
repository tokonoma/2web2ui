import React from 'react';
import { shallow } from 'enzyme';
import ListProgress from '../ListProgress';


const subject = (props = {}) => shallow(
  <ListProgress
    status='batch_triggered'
    {...props}
  />
);

describe('ListProgress', () => {
  it('should render correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render percentage based on status', () => {
    expect(subject({ status: 'performing_free_email' }).find('ProgressBar').prop('completed')).toEqual(70);
  });
});
