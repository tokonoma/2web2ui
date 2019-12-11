import React from 'react';
import { TextField } from '@sparkpost/matchbox';

const SingleDatePicker = ({ onChange }) => (
  <div style={{ marginTop: 15 }}>
    <label htmlFor="date">Send Date</label>
    <br />
    <TextField id="date" style={{ resize: 'none' }} onChange={onChange} type="datetime-local" />
  </div>
);

export default SingleDatePicker;
