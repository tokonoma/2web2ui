import React, { Component } from 'react';
import _ from 'lodash';

import { TableCollection } from 'src/components';
import { PageLink } from 'src/components/links';

const columns = ['IP', 'Hostname'];

export class IpList extends Component {
  getRowData = ip => {
    const { pool } = this.props;
    const ipLink = (
      <PageLink to={`/account/ip-pools/edit/${pool.id}/${ip.external_ip}`}>
        {ip.external_ip}
      </PageLink>
    );

    return [ipLink, ip.hostname];
  };

  render() {
    const { ips } = this.props;

    if (_.isEmpty(ips)) {
      return null;
    }

    return (
      <TableCollection
        columns={columns}
        rows={ips}
        getRowData={this.getRowData}
        pagination={false}
      />
    );
  }
}

export default IpList;
