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
    expect(wrapper.find('Panel')).toHaveLength(1);
    expect(wrapper.find('h6')).toHaveLength(1);
  });
});
