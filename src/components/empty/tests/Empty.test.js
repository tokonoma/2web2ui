import React from 'react';
import { Empty } from 'src/components';
import { Panel } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import { shallow } from 'enzyme';

jest.mock('src/context/HibanaContext');

describe('Empty: ', () => {
  beforeEach(() => useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]));

  const subject = props => {
    return shallow(<Empty title="Empty Title" message="nothing here to see" {...props} />);
  };

  it('should render', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('Empty Title');
    expect(wrapper).toHaveTextContent('nothing here to see');
  });

  it('renders a with a "Panel" component by default', () => {
    const wrapper = subject()
      .dive()
      .dive(); // TODO: Only 1 dive needed when OG theme is removed

    expect(wrapper.find(Panel)).toExist();
  });

  it('does not render a "Panel" component when `isPanel` is `false`', () => {
    const wrapper = subject({ hasPanel: false })
      .dive()
      .dive(); // TODO: Only 1 dive needed when OG theme is removed

    expect(wrapper.find(Panel)).not.toExist();
  });
});
