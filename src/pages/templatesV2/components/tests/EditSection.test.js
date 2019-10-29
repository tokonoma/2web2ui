import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditSection from '../EditSection';

jest.mock('../../hooks/useEditorContext');

describe('EditSection', () => {
  const subject = ({ tabState }) => {
    useEditorContext.mockReturnValue(tabState);
    return shallow(<EditSection />);
  };

  it('renders tabs and section', () => {
    const wrapper = subject({ tabState: { currentTabIndex: 0 }});
    expect(wrapper).toMatchSnapshot();
  });

  it('sets tab on select', () => {
    const setTab = jest.fn();
    const wrapper = subject({ tabState: { currentTabIndex: 0, setTab }});

    wrapper.find('Tabs').simulate('select', 1);

    expect(setTab).toHaveBeenCalledWith(1);
  });

  describe('the Popover', () => {
    const openPopover = (wrapperComponent) => {
      wrapperComponent
        .find('Popover')
        .props()
        .trigger
        .props
        .onClick();
    };

    it('1) opens when using the trigger onClick and 2) closes when using the Popover onClose', () => {
      const wrapper = subject({ tabState: { currentTabIndex: 0 }});

      openPopover(wrapper);

      expect(wrapper.find('Popover')).toHaveProp('open', true);

      wrapper.find('Popover').simulate('close');

      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('opens the insert snippet modal via the "Insert Snippet" action and closes via the modal `onClose` prop', () => {
      const wrapper = subject({ tabState: { currentTabIndex: 0 }});

      openPopover(wrapper);

      const insertSnippetAction = wrapper.find('ActionList').props().actions.filter((item) => item.content === 'Insert Snippet')[0];

      insertSnippetAction.onClick();

      expect(wrapper.find('InsertSnippetModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);

      wrapper.find('InsertSnippetModal').simulate('close');

      expect(wrapper.find('InsertSnippetModal')).toHaveProp('open', false);
    });
  });
});
