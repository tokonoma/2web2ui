import React from 'react';

const SingleDatePicker = ({ onChange }) => (
  <div style={{ marginTop: 15 }}>
    <label htmlFor="date">Send Date</label>
    <br />
    <input id="date" style={{ lineHeight: '1.5rem' }} onChange={onChange} type="datetime-local" />
  </div>
);

export default SingleDatePicker;
