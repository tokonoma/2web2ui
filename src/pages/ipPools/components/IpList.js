import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TableCollection } from 'src/components';

const columns = ['IP', 'Hostname'];

export class IpList extends Component {
  getRowData = (ip) => {
    const { pool } = this.props;
    const ipLink = <Link to={`/account/ip-pools/edit/${pool.id}/${ip.external_ip}`}>{ip.external_ip}</Link>;

    return [
      ipLink,
      ip.hostname
    ];
  };

  render() {
    const { ips } = this.props;

    if (!ips.length) {
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
