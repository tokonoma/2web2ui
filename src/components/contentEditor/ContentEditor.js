import React from 'react';
import { Field } from 'redux-form';
import { Panel, Tabs } from '@sparkpost/matchbox';
import { json } from 'src/helpers/validation';
import AceWrapper from './AceWrapper';

import './ContentEditor.scss';
import styles from './ContentEditor.module.scss';

const fields = [
  {
    content: 'HTML',
    mode: 'html',
    name: 'content.html',
    syntaxValidation: false,
    show: () => true
  },
  {
    content: 'Text',
    name: 'content.text',
    mode: 'text',
    syntaxValidation: false,
    show: () => true
  },
  {
    content: 'AMP HTML',
    name: 'content.amp_html',
    mode: 'html',
    syntaxValidation: false,
    show: () => true
  },
  {
    alwaysEditable: true,
    content: 'Test Data',
    name: 'testData',
    mode: 'json',
    syntaxValidation: true,
    show: ({ contentOnly }) => !contentOnly
  }
];

class ContentEditor extends React.Component {
  state = {
    selectedTab: 0
  }

  // see, https://playground.amp.dev/?referrer=ampbyexample.com&runtime=amp4email&mode=Responsive
  // see, https://github.com/ampproject/amp-by-example/blob/master/playground/src/validator/validator.js
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://cdn.ampproject.org/v0/validator.js';
    script.addEventListener('load', () => {
      // const result = window.amp.validator.validateString(this.props.template.content.amp_html, 'AMP4EMAIL');
      //
      // if (result.errors.length) {
      //   console.log(
      //     window.amp.validator.renderErrorMessage(result.errors[0]), // message
      //     window.amp.validator.categorizeError(result.errors[0]), // category
      //     result.errors[0].severity.toLowerCase(), // icon
      //     result.errors[0].severity === 'ERROR', // isError
      //     result.errors[0].severity === 'WARNING' // isWarning
      //   );
      // }
    });
    script.addEventListener('error', (error) => {
      // console.log('Error', error);
    });

    document.head.appendChild(script);
  }

  handleTab = (index) => {
    this.setState({ selectedTab: index });
  }

  // note, create/update snippet requests will fail if either part only contains whitespace
  normalize = (value) => {
    if (!value || value.trim() === '') {
      return '';
    }

    return value;
  }

  // note, must handle null template parts
  requiredHtmlTextOrAmp = (value, { content: { html, text, amp_html } = {}}) => {
    // return validation error if all parts are falsy or empty
    if (!this.normalize(html) && !this.normalize(text) && !this.normalize(amp_html)) {
      return 'HTML, AMP HTML, or Text is required';
    }
  }

  validTestDataJson = (value, { testData }) => {
    if (!this.props.contentOnly && json(testData)) {
      return 'Invalid Test Data';
    }
  }

  render() {
    const { readOnly } = this.props;
    const { selectedTab } = this.state;
    const visibleFields = fields.filter((field) => field.show(this.props));
    const tabs = visibleFields.map(({ content }, index) => ({ content, onClick: () => this.handleTab(index) }));

    return (
      <div className={styles.EditorSection}>
        <Tabs selected={selectedTab} tabs={tabs} />
        {this.props.action && (
          <div className={styles.Action}>{this.props.action}</div>
        )}
        <Panel className={styles.EditorPanel}>
          <Field
            component={AceWrapper}
            mode={visibleFields[selectedTab].mode}
            name={visibleFields[selectedTab].name}
            normalize={this.normalize}
            readOnly={readOnly && !visibleFields[selectedTab].alwaysEditable}
            syntaxValidation={visibleFields[selectedTab].syntaxValidation}
            validate={[this.requiredHtmlTextOrAmp, this.validTestDataJson]}
          />
        </Panel>
      </div>
    );
  }
}

export default ContentEditor;
