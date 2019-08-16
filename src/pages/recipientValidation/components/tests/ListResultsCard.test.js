import React from 'react';
import { shallow } from 'enzyme';
import ListResultsCard from '../ListResultsCard';

describe('ListResultsCard', () => {
  const subject = (props) => shallow(<ListResultsCard {...props} />);

  it('renders correctly when not complete', () => {
    const wrapper = subject({
      complete: false,
      uploaded: 1541092618
    });
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Processing');
    expect(wrapper.find('Cached')).toExist();
  });

  it('renders correctly when complete', () => {
    const wrapper = subject({
      complete: true,
      uploaded: 1541092618,
      rejectedUrl: 'testfile.csv',
      status: 'SUCCESS'
    });
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Completed');
    expect(wrapper.find('CheckCircle')).toExist();
  });

  it('renders correctly when batch job fails', () => {
    const wrapper = subject({
      complete: false,
      uploaded: 1541092618,
      rejectedUrl: 'testfile.csv',
      status: 'error'
    });
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Failed. Please try again.');
    expect(wrapper.find('Error')).toExist();
  });

  it('renders correctly when loading and status is unknown', () => {
    expect(subject().find('LoadingSVG')).toExist();
  });
});
