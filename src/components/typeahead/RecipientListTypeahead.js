import { connect } from 'react-redux';
import { listRecipientLists } from 'src/actions/recipientLists';
import { Typeahead } from './Typeahead';
import React, { Component } from 'react';
import Item from './TemplateTypeaheadItem';

export class TemplateTypeahead extends Component {
  static defaultProps = {
    name: 'template',
  };

  componentDidMount() {
    const { results, listRecipientLists } = this.props;

    // For redux-form FieldArrays
    // Subsequent GETs on this list will refresh any selector using it,
    // which also forces a form reinitialize if used in a form's initialValues.
    if (results.length === 0) {
      listRecipientLists();
    }
  }

  render() {
    const { hasTemplates } = this.props;

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
  const recipientLists = state.recipientLists.list || [];
  return {
    results: recipientLists,
    hasTemplates: recipientLists.length > 0,
  };
}

export default connect(mapStateToProps, { listRecipientLists })(TemplateTypeahead);
