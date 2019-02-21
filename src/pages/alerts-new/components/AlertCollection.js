import React, { Component } from 'react';

class AlertCollection extends Component {
  getColumns() {
    const columns = [
      { label: 'Name', sortKey: 'name' },
      // { label: 'Status', sortKey: 'status' },
      // { label: 'Template', sortKey: (i) => i.winning_template_id || i.default_template.template_id },
      // { label: 'Last Modified', sortKey: 'updated_at' },
      null
    ];

    return columns;
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default AlertCollection;
