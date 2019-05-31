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
});
