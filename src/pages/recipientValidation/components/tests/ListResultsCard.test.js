import React from 'react';
import { shallow } from 'enzyme';
import ListResultsCard from '../ListResultsCard';

describe('ListResultsCard', () => {
  const subject = (props) => shallow(<ListResultsCard {...props} />);

  it('renders correctly when not complete', () => {
    const wrapper = subject({
      complete: false,
      uploadedAt: '2013-02-04T22:44:30.652Z'
    });

    expect(wrapper.find('.TableCell').at(0)).toHaveProp('children', 'Feb 4 2013, 5:44pm');
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Processing');
    expect(wrapper.find('Cached')).toExist();
  });

  it('renders correctly when complete', () => {
    const wrapper = subject({
      complete: true,
      uploadedAt: '2013-02-04T22:44:30.652Z',
      rejectedUrl: 'testfile.csv',
      status: 'success'
    });

    expect(wrapper.find('.TableCell').at(0)).toHaveProp('children', 'Feb 4 2013, 5:44pm');
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Completed');
    expect(wrapper.find('CheckCircle')).toExist();
  });

  it('renders correctly when batch job fails', () => {
    const wrapper = subject({
      complete: false,
      uploadedAt: '2013-02-04T22:44:30.652Z',
      rejectedUrl: 'testfile.csv',
      status: 'error'
    });

    expect(wrapper.find('.TableCell').at(0)).toHaveProp('children', 'Feb 4 2013, 5:44pm');
    expect(wrapper.find('Tag').childAt(1).text()).toEqual('Failed. Please try again.');
    expect(wrapper.find('Error')).toExist();
  });

  it('renders correctly when loading and status is unknown', () => {
    expect(subject().find('LoadingSVG')).toExist();
  });
});
