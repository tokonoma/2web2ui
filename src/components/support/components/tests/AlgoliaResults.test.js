import React from 'react';
import { shallow } from 'enzyme';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import AlgoliaResults, { OGAlgoliaResults } from '../AlgoliaResults';

jest.mock('src/hooks/useHibanaToggle');
useHibanaToggle.mockReturnValue(OGAlgoliaResults);

describe('Algolia Results component', () => {
  it('should render', () => {
    const props = {
      hit: {
        permalink: 'my-link',
        post_title: 'Post Title',
        post_excerpt: '<p>this is an excerpt from the post</p>',
      },
    };

    const wrapper = shallow(<AlgoliaResults {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
