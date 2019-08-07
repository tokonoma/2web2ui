import React from 'react';
import { shallow } from 'enzyme';

import FolderPlacementBarChart from '../FolderPlacementBarChart';

describe('Component: FolderPlacementBarChart', () => {

  const subject = ({ ...props }) => shallow(<FolderPlacementBarChart data={[]} {...props}/>);

  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correct with data', () => {
    const formattedPlacements = [
      {
        name: 'Inbox', value: 90.5
      }, {
        name: 'Spam', value: 5.5
      }, {
        name: 'Missing', value: 4
      }
    ];
    expect(subject({ data: formattedPlacements })).toMatchSnapshot();

  });

});
