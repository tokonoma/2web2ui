import React from 'react';
import { mount } from 'enzyme';
import TestApp from 'src/__testHelpers__/TestApp';
import HerokuMessage from '../HerokuMessage';

describe('HerokuMessage View Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TestApp>
        <HerokuMessage />
      </TestApp>,
    );
  });
  it('should render', () => {
    expect(wrapper).toHaveTextContent('Please submit a ticket through Heroku');
    expect(wrapper.find({ to: 'https://help.heroku.com' })).toExist();
  });
});
