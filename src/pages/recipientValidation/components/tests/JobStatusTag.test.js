import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import JobStatusTag from '../JobStatusTag';
import styles from '../JobStatusTag.module.scss';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/hooks/useHibanaOverride');
jest.mock('src/context/HibanaContext');

describe('JobStatusTag', () => {
  beforeEach(() => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    useHibanaOverride.mockImplementationOnce(() => styles);
  });

  const subject = (props = {}) => shallow(<JobStatusTag {...props} />);

  it('renders a loading tag', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders an error tag', () => {
    expect(subject({ status: 'error' })).toMatchSnapshot();
  });

  it('renders a ready tag', () => {
    expect(subject({ status: 'queued_for_batch' })).toMatchSnapshot();
  });

  it('renders a success tag', () => {
    expect(subject({ status: 'success' })).toMatchSnapshot();
  });
});
