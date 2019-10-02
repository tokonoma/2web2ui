import React from 'react';
import { shallow } from 'enzyme';
import IntegrationPageFilter from '../IntegrationPageFilter';
import * as keyEvents from 'src/helpers/keyEvents';

jest.mock('src/helpers/keyEvents');

describe('IntegrationPageFilter: ', () => {
  const subject = (props = {}) => shallow(
    <IntegrationPageFilter
      onChange={() => {}}
      {...props}
    />
  );

  it('renders default values', () => {
    const wrapper = subject();

    expect(wrapper.find('Select')).toHaveProp('value', '');
    expect(wrapper.find('TextField')).toHaveProp('value', '');
  });

  it('renders default status when initial value is unknown', () => {
    const wrapper = subject({ initialValues: { batchStatus: 'blah' }});
    expect(wrapper.find('Select')).toHaveProp('value', '');
  });

  it('renders with initial batch ids and ignores status', () => {
    const wrapper = subject({
      initialValues: {
        batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'],
        batchStatus: 'success'
      }
    });

    expect(wrapper.find('Select')).toHaveProp('value', '');
    expect(wrapper.find('TextField')).toHaveProp('value', '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0');
  });

  it('renders with initial batch status', () => {
    const wrapper = subject({
      batchIds: [],
      initialValues: { batchStatus: 'success' }
    });

    expect(wrapper.find('Select')).toHaveProp('value', 'success');
  });

  it('calls onChange on text field blur', () => {
    const onChange = jest.fn();
    const wrapper = subject({
      initialValues: {
        batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0']
      },
      onChange
    });

    wrapper.find('TextField').simulate('blur');

    expect(onChange).toHaveBeenCalledWith({
      batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'],
      batchStatus: ''
    });
  });

  it('calls onChange on text field key press enter', () => {
    keyEvents.onEnter.mockImplementation((fn) => fn);

    const onChange = jest.fn();
    const wrapper = subject({
      initialValues: {
        batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0']
      },
      onChange
    });

    wrapper.find('TextField').simulate('keypress');

    expect(onChange).toHaveBeenCalledWith({
      batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'],
      batchStatus: ''
    });
  });

  describe('when status changes', () => {
    const selectStatus = (wrapper, nextStatus) => {
      wrapper.find('Select').simulate('change', { currentTarget: { value: nextStatus }});
    };

    it('renders with next status', () => {
      const wrapper = subject();
      selectStatus(wrapper, 'success');
      expect(wrapper.find('Select')).toHaveProp('value', 'success');
    });

    it('resets batch id filter', () => {
      const wrapper = subject({ initialValues: { batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0']}});
      selectStatus(wrapper, 'success');
      expect(wrapper.find('TextField')).toHaveProp('value', '');
    });

    it('calls onChange', () => {
      const onChange = jest.fn();
      const wrapper = subject({ onChange });

      selectStatus(wrapper, 'success');

      expect(onChange).toHaveBeenCalledWith({ batchIds: [], batchStatus: 'success' });
    });
  });

  describe('when text field changes', () => {
    const changeText = (wrapper, nextValue) => {
      wrapper.find('TextField').simulate('change', { currentTarget: { value: nextValue }});
    };

    it('renders with next value', () => {
      const wrapper = subject();
      changeText(wrapper, '8c4b19fb-');
      expect(wrapper.find('TextField')).toHaveProp('value', '8c4b19fb-');
    });

    it('resets batch status filter', () => {
      const wrapper = subject();
      changeText(wrapper, '8c4b19fb-');
      expect(wrapper.find('Select')).toHaveProp('value', '');
    });
  });
});
