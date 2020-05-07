import React from 'react';
import { shallow } from 'enzyme';
import PanelSectionTableCollection from '../PanelSectionTableCollection';

jest.mock('src/context/HibanaContext', () => ({ useHibana: () => [{ isHibanaEnabled: true }] }));

describe('PanelSectionTableCollection', () => {
  const subject = (props = {}) => shallow(<PanelSectionTableCollection {...props} />);

  // nothing really

  describe('within custom layout', () => {
    const layout = props => {
      const Component = subject().prop('children');
      return shallow(<Component {...props} collection={<div>Test Collection</div>} />);
    };

    it('renders only a collection', () => {
      expect(layout()).toHaveTextContent('Test Collection');
    });

    it('renders heading when present', () => {
      expect(layout({ heading: <div>Test Header</div> })).toHaveTextContent('Test Header');
    });

    it('renders filter box when present', () => {
      expect(layout({ filterBox: <div>Test Filter Box</div> })).toHaveTextContent(
        'Test Filter Box',
      );
    });

    it('renders pagination when present', () => {
      expect(layout({ pagination: <div>Test Pagination</div> })).toHaveTextContent(
        'Test Pagination',
      );
    });
  });
});
