import React from 'react';
import { shallow } from 'enzyme';

import FolderPlacementBarChart from '../FolderPlacementBarChart';

describe('Component: FolderPlacementBarChart', () => {
  const defaultPlacements = {};
  const subject = ({ ...props }) => shallow(<FolderPlacementBarChart placements={defaultPlacements} {...props}/>);

  it('renders correctly with defaults', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correct with data', () => {
    const placements = {
      inbox_pct: 0.905,
      spam_pct: 0.55,
      missing_pct: 0.40
    };

    expect(subject({ placements })).toMatchSnapshot();

  });

});
