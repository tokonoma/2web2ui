import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'src/components/matchbox';
import DownloadLink from '../DownloadLink';

describe('DownloadLink', () => {
  const subject = props =>
    shallow(
      <DownloadLink to="/download/data.csv" {...props}>
        Download Me!
      </DownloadLink>,
    );

  it('renders a link', () => {
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('UnstyledLink');
    expect(wrapper).toHaveTextContent('Download Me!');
  });

  it('sets download props', () => {
    const wrapper = subject();
    expect(wrapper).toHaveProp('download');
    expect(wrapper).toHaveProp('referrerPolicy');
  });

  it('ignores component prop', () => {
    const wrapper = subject({ component: () => null });
    expect(wrapper).not.toHaveProp('component');
  });

  it('renders a button', () => {
    const wrapper = subject({ as: Button });
    expect(wrapper).toHaveDisplayName('Button');
    expect(wrapper).toHaveTextContent('Download Me!');
  });
});
