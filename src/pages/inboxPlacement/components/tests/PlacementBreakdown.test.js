import React from 'react';
import { shallow } from 'enzyme';

import { PLACEMENT_FILTER_TYPES } from '../../constants/types';
import PlacementBreakdown, {
  GroupPercentage,
  HeaderComponent,
  RowComponent,
} from '../PlacementBreakdown';
import formatFilterName from '../../helpers/formatFilterName';

describe('Component: PlacementBreakdown', () => {
  const data = [
    {
      mailbox_provider: 'dogmail.com',
      region: 'north america',
      sending_ip: '101.101',
      placement: {
        inbox_pct: 0,
        spam_pct: 0,
        missing_pct: 1,
      },
      authentication: {
        spf_pct: 0,
        dkim_pct: 0,
        dmarc_pct: 1,
      },
    },
    {
      mailbox_provider: 'doghouseinbox.com',
      region: 'europe',
      sending_ip: '101.102',
      placement: {
        inbox_pct: 0.8,
        spam_pct: 0.1,
        missing_pct: 0.1,
      },
      authentication: {
        spf_pct: 0.8,
        dkim_pct: 0.1,
        dmarc_pct: 0.1,
      },
    },
  ];

  const subject = ({ ...props }) => shallow(<PlacementBreakdown data={[]} {...props} />);

  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('matches snapshot with provider data', () => {
    expect(subject({ data })).toMatchSnapshot();
  });

  describe('SubComponent: GroupPercentage', () => {
    it('renders percentage correctly', () => {
      expect(shallow(<GroupPercentage value={0.2} />)).toMatchSnapshot();
    });
  });

  describe('RowComponent', () => {
    const { mailbox_provider, region, placement, sending_ip, authentication } = data[0];

    it('renders region correctly', () => {
      const wrapper = shallow(
        <RowComponent
          id={1}
          // This is undefined because results by region doesn't have a mailbox_provider nor sending ip
          mailbox_provider={undefined}
          sending_ip={undefined}
          region={region}
          type={PLACEMENT_FILTER_TYPES.REGION}
          placement={placement}
          authentication={authentication}
        />,
      );

      expect(wrapper.find('PageLink')).toHaveProp(
        'to',
        '/inbox-placement/details/1/region/north america',
      );
      expect(wrapper.find('PageLink').find('strong')).toHaveTextContent(
        formatFilterName(PLACEMENT_FILTER_TYPES.REGION, 'north america'),
      );
    });

    it('renders sending ip correctly', () => {
      const wrapper = shallow(
        <RowComponent
          id={1}
          // This is undefined because results by sending ip doesn't have a mailbox_provider nor region
          mailbox_provider={undefined}
          region={undefined}
          sending_ip={sending_ip}
          type={PLACEMENT_FILTER_TYPES.SENDING_IP}
          placement={placement}
          authentication={authentication}
        />,
      );

      expect(wrapper.find('PageLink')).toHaveProp(
        'to',
        '/inbox-placement/details/1/sending-ip/101.101',
      );
      expect(wrapper.find('PageLink').find('strong')).toHaveTextContent(
        formatFilterName(PLACEMENT_FILTER_TYPES.SENDING_IP, '101.101'),
      );
    });

    it('renders mailbox provider correctly', () => {
      const wrapper = shallow(
        <RowComponent
          id={1}
          mailbox_provider={mailbox_provider}
          region={region}
          type={PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER}
          placement={placement}
          authentication={authentication}
        />,
      );

      expect(wrapper.find('PageLink')).toHaveProp(
        'to',
        '/inbox-placement/details/1/mailbox-provider/dogmail.com',
      );
      expect(wrapper.find('PageLink').find('strong')).toHaveTextContent(
        formatFilterName(PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER, 'dogmail.com'),
      );
    });
  });

  describe('HeaderComponent', () => {
    it('renders correctly', () => {
      expect(
        shallow(<HeaderComponent type={PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER} />),
      ).toMatchSnapshot();
    });
  });
});
