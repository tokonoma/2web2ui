import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../../hooks/useEditorContext';
import EditSection from '../EditSection';
import styles from '../EditSection.module.scss';

jest.mock('src/hooks/useHibanaOverride');
jest.mock('src/context/HibanaContext');
jest.mock('../../hooks/useEditorContext');

function beforeSteps() {
  useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
  useHibanaOverride.mockImplementationOnce(() => styles);
}

describe('EditSection', () => {
  beforeEach(() => beforeSteps());

  const subject = editorState => {
    beforeSteps();
    useEditorContext.mockReturnValue({ isReadOnly: false, canModify: true, ...editorState });

    return shallow(<EditSection />);
  };

  it('renders tabs and section', () => {
    const wrapper = subject({ currentTabIndex: 0 });
    expect(wrapper).toMatchSnapshot();
  });

  it('sets tab on select', () => {
    const setTab = jest.fn();
    const wrapper = subject({ currentTabIndex: 0, setTab });

    wrapper.find('Tabs').simulate('select', 1);

    expect(setTab).toHaveBeenCalledWith(1);
  });

  it('renders a "Read Only" tag in published mode for the "HTML", "AMP HTML", and "Text" tabs', () => {
    // HTML tab visible
    let wrapper = subject({
      currentTabIndex: 0,
      isReadOnly: true,
    });
    expect(wrapper).toHaveTextContent('Read Only');

    // AMP HTML tab visible
    wrapper = subject({
      currentTabIndex: 1,
      isReadOnly: true,
    });
    expect(wrapper).toHaveTextContent('Read Only');

    // Text tab visible
    wrapper = subject({
      currentTabIndex: 2,
      isReadOnly: true,
    });
    expect(wrapper).toHaveTextContent('Read Only');

    // Test data tab visible
    wrapper = subject({
      currentTabIndex: 3,
      isReadOnly: true,
    });
    expect(wrapper).not.toHaveTextContent('Read Only');
  });

  it('does not render a "Read Only" tag in published mode for the "Test Data" tab', () => {
    const wrapper = subject({ currentTabIndex: 3, isPublishedMode: true });

    expect(wrapper).not.toHaveTextContent('Read Only');
  });

  describe('the Popover', () => {
    beforeEach(() => beforeSteps());

    const openPopover = wrapperComponent => {
      wrapperComponent
        .find('Popover')
        .props()
        .trigger.props.onClick();
    };

    it('1) opens when using the trigger onClick and 2) closes when using the Popover onClose', () => {
      const wrapper = subject({ currentTabIndex: 0 });

      openPopover(wrapper);

      expect(wrapper.find('Popover')).toHaveProp('open', true);

      wrapper.find('Popover').simulate('close');

      expect(wrapper.find('Popover')).toHaveProp('open', false);
    });

    it('opens the insert snippet modal via the "Insert Snippet" action and closes via the modal `onClose` prop', () => {
      const wrapper = subject({ currentTabIndex: 0 });

      openPopover(wrapper);

      const insertSnippetAction = wrapper
        .find('ActionList')
        .props()
        .actions.filter(item => item.content === 'Insert Snippet')[0];

      insertSnippetAction.onClick();

      expect(wrapper.find('InsertSnippetModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);

      wrapper.find('InsertSnippetModal').simulate('close');

      expect(wrapper.find('InsertSnippetModal')).toHaveProp('open', false);
    });

    it('does not render when not in published mode', () => {
      const wrapper = subject({
        currentTabIndex: 0,
        isPublishedMode: true,
      });

      expect(wrapper.find('Popover')).not.toExist();
    });

    it('does not render when the user cannot modify templates', () => {
      const wrapper = subject({
        currentTabIndex: 0,
        isPublishedMode: false,
        canModify: false,
      });

      expect(wrapper.find('Popover')).not.toExist();
    });

    it('opens the insert amp confirmation modal via the "Insert AMP Boilerplate" action', () => {
      const wrapper = subject({
        currentTabIndex: 1,
        currentTabKey: 'amp_html',
      });

      openPopover(wrapper);

      const insertAMPAction = wrapper
        .find('ActionList')
        .props()
        .actions.filter(item => item.content === 'Insert AMP Boilerplate')[0];

      insertAMPAction.onClick();

      expect(wrapper.find('ConfirmationModal')).toHaveProp('open', true);
      expect(wrapper.find('Popover')).toHaveProp('open', false);

      wrapper.find('ConfirmationModal').simulate('cancel');

      expect(wrapper.find('ConfirmationModal')).toHaveProp('open', false);
    });
  });
});
