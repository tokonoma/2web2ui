import React, { Component } from 'react';
import Bee from 'bee-plugin';
import { connect } from 'react-redux';
import { getDraft } from 'src/actions/templates';
import { Loading } from 'src/components';
import { selectTemplateById } from 'src/selectors/templates';
// see, https://github.com/BEE-Plugin/BEE-FREE-templates
import template from './base-one-column.json';

class EditWithBeePage extends Component {
  componentDidMount() {
    const beeTest = new Bee();

    beeTest
      .getToken(
        '83941de8-f6fc-46de-a050-749092ccf851', // clientId
        'IQL1Jea0CA7PYkU2H3pLiAO8b3vQteeF9KpdykmwdmQp5rGXn9o' // clientSecret
      )
      .then(() => {
        const config = {
          uid: 'brian', // [mandatory]
          container: 'bee-plugin-container', // [mandatory]
          autosave: 30, // [optional, default:false]
          language: 'en-US', // [optional, default:'en-US']
          trackChanges: false, // [optional, default: false]
          // specialLinks: specialLinks, // [optional, default:[]]
          // mergeTags: mergeTags, // [optional, default:[]]
          // mergeContents: mergeContents, // [optional, default:[]]
          // preventClose: false, // [optional, default:false]
          // editorFonts : {}, // [optional, default: see description]
          // roleHash : "", // [optional, default: ""]
          // rowDisplayConditions : {}, // [optional, default: {}]
          onSave: function (jsonFile, htmlFile) { /* Implements function for save */ }, // [optional]
          onChange: function (jsonFile, response) { /* Implements function for change */ }, // [optional]
          onSaveAsTemplate: function (jsonFile) { /* Implements function for save as template (only JSON file) */ }, // [optional]
          onAutoSave: function (jsonFile) { /* Implements function for auto save */ }, // [optional]
          onSend: function (htmlFile) { /* Implements function to send the message */ }, // [optional]
          onLoad: function (jsonFile) { /* Implements function to perform an action once the template is loaded */ }, // [optional]
          onError: function (errorMessage) { /* Implements function to handle error messages */ } // [optional]
        };

        beeTest.start(config, template);
      });
  }

  render() {
    return <div id="bee-plugin-container" style={{ height: '100vh', position: 'fixed', width: '100vw', left: '0', top: '0', 'z-index': '1000' }} />;
  }
}

class EditWithBeePageContainer extends Component {
  componentDidMount() {
    const { match, getDraft, subaccountId } = this.props;
    getDraft(match.params.id, subaccountId);
  }

  render() {
    const { template } = this.props;

    if (!template) {
      return <Loading />;
    }

    return <EditWithBeePage template={template} />;
  }
}

export default connect((state, props) => ({ template: selectTemplateById(state, props).draft }), { getDraft })(EditWithBeePageContainer);
