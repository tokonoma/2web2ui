import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'src/components/loading';
import { Panel } from 'src/components/matchbox';

const PanelSectionLoading = ({ minHeight }) => {
  return (
    <Panel.Section data-id="panel-section-loading" style={{ minHeight, position: 'relative' }}>
      <Loading minHeight={minHeight} />
    </Panel.Section>
  );
};

PanelSectionLoading.propTypes = {
  minHeight: PropTypes.string,
};

PanelSectionLoading.defaultProps = {
  minHeight: '400px',
};

export default PanelSectionLoading;
