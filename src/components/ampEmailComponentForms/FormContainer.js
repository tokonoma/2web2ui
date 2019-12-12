import React, { useState } from 'react';
import generator from 'amp-email-generator';
import { TextField, Button, Select } from '@sparkpost/matchbox';
import _ from 'lodash';
import ButtonWrapper from 'src/components/buttonWrapper';
import Editor from '../../pages/templates/components/Editor';
import CheckboxnRadioForm from './CheckboxnRadioForm';

const FormContainer = () => {
  const [formState, setFormState] = useState({ fields: [], target: '_blank', action: 'GET' });
  const [code, setCode] = useState(null);
  const [fieldcount, setFieldCount] = useState(0);
  const [addField, setAddField] = useState(false);
  const [allFields, setAllFields] = useState([]);
  console.warn(formState);
  const onFormSubmit = () => {
    const {
      target,
      action,
      actionXHR,
      fields,
      errorMessage,
      successMessage,
      submitLabel,
    } = formState;
    const formAttributes = {
      target,
      action,
      'action-xhr': actionXHR || 'https://example.com/xhr',
    };

    const fieldsForGenerator = [
      {
        type: formState.grouptype,
        name: formState.grouplabel,
        fields: Object.keys(fields).reduce((acc, idx) => {
          const { label, value, checked } = fields[idx];
          acc.push({
            label,
            id: value,
            value,
            checked,
          });
          return acc;
        }, []),
      },
    ];
    setCode(
      generator.getForm({
        fields: fieldsForGenerator,
        formAttributes,
        error: errorMessage,
        success: successMessage,
        submitLabel,
      }).html,
    );
  };
  const copycode = () => {
    var copyText = document.getElementById('amp-input');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  const addtoState = (number, state) => {
    const prevField = formState.fields;

    setFormState({ ...formState, ...{ fields: { ...prevField, ...{ [number]: state } } } });
  };

  const handleAddField = type => {
    switch (type) {
      case 'Checkbox/Radio':
        setAllFields([
          ...allFields,
          <CheckboxnRadioForm addtoState={addtoState} number={fieldcount} />,
        ]);
        break;
      case 'TextField':
        setAllFields([...allFields, <TextField />]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <p>
        <strong>Form</strong>
        &nbsp;&nbsp;
        {code && <Button onClick={copycode}>Copy Code</Button>}
      </p>
      {!code && (
        <form>
          <Select
            label="Target"
            placeholder={'Target'}
            options={['_blank', '_top']}
            onChange={e => setFormState({ ...formState, ...{ target: e.target.value } })}
          />
          <Select
            id="id"
            label="Select an Action"
            options={['GET', 'POST']}
            onChange={e => setFormState({ ...formState, ...{ action: e.target.value } })}
          />
          <TextField
            label="action-xhr"
            placeholder={'Action-XHR'}
            onChange={e => setFormState({ ...formState, ...{ actionXHR: e.target.value } })}
          />
          <TextField
            id="submit-label"
            label="Submit Label"
            placeholder={'Submit Label'}
            onChange={e => setFormState({ ...formState, ...{ submitLabel: e.target.value } })}
          />
          <TextField
            label="Success Message"
            placeholder={'Success Message'}
            onChange={e => setFormState({ ...formState, ...{ successMessage: e.target.value } })}
          />
          <TextField
            label="Error Message"
            placeholder={'Error Message'}
            onChange={e => setFormState({ ...formState, ...{ errorMessage: e.target.value } })}
          />
          {allFields}
          <Button onClick={() => setAddField(true)}> Add Field +</Button>
          {addField && (
            <Select
              label="Field Type"
              options={['Select a type', 'TextField', 'Checkbox/Radio']}
              onChange={e => {
                setAddField(false);
                setFieldCount(fieldcount + 1);
                handleAddField(e.target.value);
              }}
            />
          )}

          <ButtonWrapper>
            <Button onClick={onFormSubmit}>Get AMP code</Button>
          </ButtonWrapper>
        </form>
      )}

      {code && (
        <div style={{ height: '400px' }}>
          <Editor
            mode="html"
            name="amp-content"
            onChange={() => {}}
            value={code}
            readOnly={true}
            type={true}
          />
          <input type="text" value={code} id="amp-input" style={{}} />
        </div>
      )}
    </>
  );
};
export default FormContainer;
