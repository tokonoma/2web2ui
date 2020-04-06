import React from 'react';
import { Empty } from 'src/components';
import { mount } from 'enzyme';
import TestApp from 'src/__testHelpers__/TestApp';

describe('Empty: ', () => {
  it('should render', () => {
    const wrapper = mount(
      <TestApp>
        <Empty title={'Empty Title'} message={'nothing here to see'} />
      </TestApp>,
    );
    expect(wrapper).toHaveTextContent('Empty Title');
    expect(wrapper).toHaveTextContent('nothing here to see');
  });
});
