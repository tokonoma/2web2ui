import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import InlineItems from './InlineItems';

jest.mock('src/context/HibanaContext');

describe('InlineItems', () => {
  const subject = (props = {}) =>
    shallow(
      <InlineItems {...props}>
        <div>Apple</div>
        <div>Banana</div>
        <div>Cantaloupe</div>
        {false && <div>Zucchini</div>}
      </InlineItems>,
    );

  beforeEach(() => {
    useHibana.mockReturnValue([{ isHibanaEnabled: false }]);
  });

  it('renders list of items', () => {
    const wrapper = subject();
    expect(wrapper.find('.compact')).not.toExist();
    expect(wrapper).toHaveTextContent('Apple');
    expect(wrapper).toHaveTextContent('Banana');
    expect(wrapper).toHaveTextContent('Cantaloupe');
    expect(wrapper).not.toHaveTextContent('Zucchini');
  });

  it('renders compact list of items', () => {
    const wrapper = subject({ compact: true });
    expect(wrapper.find('.compact')).toHaveLength(4); // container + 3 items
  });

  describe('with Hibana', () => {
    beforeEach(() => {
      useHibana.mockReturnValue([{ isHibanaEnabled: true }]);
    });

    it('renders list of items', () => {
      const wrapper = subject();
      expect(wrapper.find({ marginTop: 0 })).not.toExist();
      expect(wrapper).toHaveTextContent('Apple');
      expect(wrapper).toHaveTextContent('Banana');
      expect(wrapper).toHaveTextContent('Cantaloupe');
      expect(wrapper).not.toHaveTextContent('Zucchini');
    });

    it('renders compact list of items', () => {
      const wrapper = subject({ compact: true });
      expect(wrapper.find({ marginTop: 0 })).toHaveLength(4); // container + 3 items
    });
  });
});
