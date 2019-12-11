import { connect } from 'react-redux';
import { listPools } from 'src/actions/ipPools';
import { Typeahead } from './Typeahead';
import React, { Component } from 'react';
import Item from './TemplateTypeaheadItem';

export class TemplateTypeahead extends Component {
  static defaultProps = {
    name: 'template',
  };

  componentDidMount() {
    const { results, listPools } = this.props;

    // For redux-form FieldArrays
    // Subsequent GETs on this list will refresh any selector using it,
    // which also forces a form reinitialize if used in a form's initialValues.
    if (results.length === 0) {
      listPools();
    }
  }

  render() {
    const { hasTemplates } = this.props;
    console.log(this.props.results);
    return (
      <Typeahead
        renderItem={item => <Item id={item.id} />}
        itemToString={item => (item ? item.id : '')}
        label="Template"
        disabled={!hasTemplates}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  const ipPools = state.ipPools.list || [];
  return {
    results: ipPools,
    hasTemplates: ipPools.length > 0,
  };
}

export default connect(mapStateToProps, { listPools })(TemplateTypeahead);
