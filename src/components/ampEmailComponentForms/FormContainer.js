import React, { useState } from 'react';
import { TextField, Button, Select } from '@sparkpost/matchbox';
import _ from 'lodash';
import ButtonWrapper from 'src/components/buttonWrapper';
import Editor from '../../pages/templates/components/Editor';
import CheckboxnRadioForm from './CheckboxnRadioForm';
const ampHTML = `<amp-selector layout="container"
class="sample-selector"
multiple>
<amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
  width="90"
  height="60"
  option="1"></amp-img>
<amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
  width="90"
  height="60"
  option="2"></amp-img>
<amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
  width="90"
  height="60"
  option="3"></amp-img>
<amp-img src="/static/samples/img/landscape_village_300x200.jpg"
  width="90"
  height="60"
  option="4"></amp-img>
</amp-selector>`;
const FormContainer = () => {
  const [formState, setFormState] = useState({ fields: [] });
  const [code, setCode] = useState(null);
  const [addField, setAddField] = useState(false);
  const [allFields, setAllFields] = useState([]);
  const onFormSubmit = () => {
    setCode(ampHTML);
  };

  const copycode = () => {
    var copyText = document.getElementById('amp-input');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  const addtoState = state => {
    const prevField = formState.fields;
    prevField.push(state);
    setFormState({ ...formState, prevField });
  };

  const handleAddField = type => {
    switch (type) {
      case 'Checkbox/Radio':
        setAllFields([...allFields, <CheckboxnRadioForm onChange={addtoState} />]);
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
          <TextField label="Target" placeholder={'Target'} value={'_blank'} />
          <Select id="id" label="Select an option" options={['GET', 'POST']} />
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
            value={ampHTML}
            readOnly={true}
            type={true}
          />
          <input type="text" value={ampHTML} id="amp-input" style={{}} />
        </div>
      )}
    </>
  );
};
export default FormContainer;
