import React from 'react';
import { mount } from 'enzyme';
import TestApp from 'src/__testHelpers__/TestApp';
import NoIssues from '../NoIssues';

describe('NoIssues View Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onCancel: jest.fn(),
    };
    wrapper = mount(
      <TestApp>
        <NoIssues {...props} />
      </TestApp>,
    );
  });

  it('should render', () => {
    expect(wrapper).toHaveTextContent('Sorry, you are not authorized to submit a support ticket.');
    expect(wrapper).toHaveTextContent('Search support articles');
  });

  it('should cancel', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(props.onCancel).toHaveBeenCalled();
  });
});
