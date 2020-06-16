import React from 'react';
import { Empty } from 'src/components';
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
});
