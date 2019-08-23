import React from 'react';
import { shallow } from 'enzyme';
import { ListResultsFeatureToggle } from '../ListResultsFeatureToggle';

describe('ListResultsFeatureToggle', () => {
  const subject = (props = {}) => shallow(
    <ListResultsFeatureToggle
      {...props}
    />
  );

  it('renders list results by default', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders jobs table collection', () => {
    expect(subject({ isFlagEnabled: true })).toMatchSnapshot();
  });
});
