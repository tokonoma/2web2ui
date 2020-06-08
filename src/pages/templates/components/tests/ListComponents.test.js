import { shallow } from 'enzyme';
import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { LastUpdated, Name, Status } from '../ListComponents';
import styles from '../ListComponents.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('Template List Components', () => {
  beforeEach(() => useHibanaOverride.mockReturnValue(() => styles));
  let wrapper;

  describe('Name', () => {
    beforeEach(() => {
      const props = {
        name: 'template name',
        list_name: 'template name',
        id: 'id-123',
        subaccount_id: 123,
        list_status: 'draft',
      };
      wrapper = shallow(<Name {...props} />);
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should navigate to published page if template is published', () => {
      wrapper.setProps({ list_status: 'published' });
      expect(wrapper.find('PageLink')).toHaveProp(
        'to',
        '/templates/edit/id-123/published/content?subaccount=123',
      );
    });
  });

  describe('Status', () => {
    it('should render published', () => {
      expect(shallow(<Status list_status="published" />)).toMatchSnapshot();
    });

    it('should render draft', () => {
      expect(shallow(<Status list_status="draft" />)).toMatchSnapshot();
    });

    it('should render unpublished changes', () => {
      expect(shallow(<Status list_status="published_with_draft" />)).toMatchSnapshot();
    });
  });

  describe('LastUpdated', () => {
    it('should render', () => {
      expect(
        shallow(<LastUpdated last_update_time="2017-08-10T14:15:16+00:00" />),
      ).toMatchSnapshot();
    });
  });
});
