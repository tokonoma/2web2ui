import React, { Component } from 'react';
import _ from 'lodash';
import { Box, Tooltip } from 'src/components/matchbox';
import { Panel } from 'src/components/matchbox';
import { LabelledValue, CopyField } from 'src/components';

class EventDetails extends Component {
  static defaultProps = {
    details: {},
  };

  renderRow = ({ value, label, key }) => {
    // Renders value in a read only textfield
    if (typeof value === 'object') {
      return (
        <LabelledValue key={key} label={label} style={{ alignItems: 'center' }}>
          <CopyField hideCopy value={JSON.stringify(value)} />
        </LabelledValue>
      );
    }

    return <LabelledValue key={key} label={label} value={value} />;
  };

  // Renders key-value rows
  renderDetails = detailsToRender => {
    const { documentation } = this.props;

    return _.keys(detailsToRender).map(key => {
      // Gets tooltip content from documentation store
      const tooltipContent = _.get(documentation, [detailsToRender.type, key]);

      const row = {
        key,
        label: tooltipContent ? (
          <Tooltip dark content={tooltipContent}>
            {key}
          </Tooltip>
        ) : (
          key
        ),
        value: detailsToRender[key],
      };

      return this.renderRow(row);
    });
  };

  render() {
    // Remove formattedDate as its only used for the history table
    const detailsToRender = _.omit(this.props.details, 'formattedDate');

    return (
      <Panel title="Event Details">
        {/* TODO: We could stand to have a component like <Panel.Header> from Matchbox to address this scenario */}
        <Box paddingTop="500" borderBottom="400" />
        <Panel.Section>{this.renderDetails(detailsToRender)}</Panel.Section>
        <Panel.Section>
          <LabelledValue label="Raw Json" style={{ alignItems: 'center' }}>
            <CopyField value={JSON.stringify(detailsToRender)} />
          </LabelledValue>
        </Panel.Section>
      </Panel>
    );
  }
}

export default EventDetails;
