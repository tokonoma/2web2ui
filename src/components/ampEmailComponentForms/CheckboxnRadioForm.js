import React, { useState } from 'react';
import { TextField, Radio, Grid, Button } from '@sparkpost/matchbox';
import _ from 'lodash';
// import ButtonWrapper from 'src/components/buttonWrapper';
// import Editor from '../../pages/templates/components/Editor';
// const ampHTML = `<amp-selector layout="container"
// class="sample-selector"
// multiple>
// <amp-img src="/static/samples/img/landscape_sea_300x199.jpg"
//   width="90"
//   height="60"
//   option="1"></amp-img>
// <amp-img src="/static/samples/img/landscape_desert_300x200.jpg"
//   width="90"
//   height="60"
//   option="2"></amp-img>
// <amp-img src="/static/samples/img/landscape_ship_300x200.jpg"
//   width="90"
//   height="60"
//   option="3"></amp-img>
// <amp-img src="/static/samples/img/landscape_village_300x200.jpg"
//   width="90"
//   height="60"
//   option="4"></amp-img>
// </amp-selector>`;
const ValuenLabel = ({ onChange, index }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  return (
    <Grid>
      <Grid.Column md={6}>
        <TextField
          label={'label'}
          value={label}
          onChange={e => {
            setLabel(e.target.value);
            onChange(index, { label: e.target.value });
          }}
        />
      </Grid.Column>
      <Grid.Column md={6}>
        <TextField
          label={'value'}
          value={value}
          onChange={e => {
            setValue(e.target.value);
            onChange(index, { value: e.target.value });
          }}
        />
      </Grid.Column>
    </Grid>
  );
};
const CheckboxnRadioForm = ({ number, addtoState }) => {
  const [formState, setFormState] = useState({
    grouplabel: '',
    labelnValues: { 0: { label: '', value: '' } },
  });
  const [count, setCount] = useState(1);
  // const [code, setCode] = useState(null);
  const onChange = (index, obj = {}) => {
    const values = { ...(formState.labelnValues[index] || {}), ...obj };
    setFormState({
      ...formState,
      labelnValues: _.merge(formState.labelnValues, { [index]: values }),
    });
    addtoState(number, {
      ...formState,
      labelnValues: _.merge(formState.labelnValues, { [index]: values }),
    });
  };

  const onRadioChange = (label, e = {}) => {
    setFormState({ ...formState, ...{ [label]: e.target.value } });
    addtoState(number, { ...formState, ...{ [label]: e.target.value } });
  };

  // const onFormSubmit = () => {
  //   setCode(ampHTML);
  // };

  // const copycode = () => {
  //   var copyText = document.getElementById('amp-input');
  //   console.log(copyText);
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999);
  //   document.execCommand('copy');
  // };
  return (
    <form>
      <TextField
        id={`group-label-${number}`}
        label="Label for the group"
        placeholder={'Group'}
        onChange={e => setFormState({ ...formState, ...{ grouplabel: e.target.value } })}
      />
      <Radio.Group label="Choose the type" key={number}>
        <Radio
          id={`radio-buttons-${number}`}
          label="Radio Buttons"
          name={`typeofgroup-${number}`}
          value={'Radio'}
          onChange={e => onRadioChange('grouptype', e)}
        />
        <Radio
          id="checkbox-group"
          label="Checkbox Group"
          name="typeofgroup"
          value={`typeofgroup-${number}`}
          onChange={e => onRadioChange('grouptype', e)}
        />
      </Radio.Group>
      {[...Array(count).keys()].map(x => (
        <ValuenLabel key={x} onChange={onChange} index={x} />
      ))}
      <Button onClick={() => setCount(count + 1)}>Add More + </Button>
    </form>
  );
};

export default CheckboxnRadioForm;
