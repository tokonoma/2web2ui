import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDraft } from 'src/actions/templates';
import { Loading } from 'src/components';
import { selectTemplateById } from 'src/selectors/templates';
// see, https://medium.com/unlayer-blog/creating-a-drag-n-drop-email-editor-with-react-db1e9eb42386
import EmailEditor from 'react-email-editor';
import template from './ree-template.json';

// hmmm... got this error
// ./node_modules/react-email-editor/es/index.js
// Module not found: Can't resolve 'styled-components' in '/Users/bkemper/Repos/sparkpost/2web2ui/node_modules/react-email-editor/es'

class EditWithReactEmailEditorPage extends Component {
  componentDidMount() {
    this.editor.loadDesign(template);
  }

  render() {
    return (
      <EmailEditor
        ref={(editor) => this.editor = editor}
      />
    );
  }
}

class EditWithReactEmailEditorPageContainer extends Component {
  componentDidMount() {
    const { match, getDraft, subaccountId } = this.props;
    getDraft(match.params.id, subaccountId);
  }

  render() {
    const { template } = this.props;

    if (!template) {
      return <Loading />;
    }

    return <EditWithReactEmailEditorPage template={template} />;
  }
}

export default connect((state, props) => ({ template: selectTemplateById(state, props).draft }), { getDraft })(EditWithReactEmailEditorPageContainer);
