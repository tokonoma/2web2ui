import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import Status from '../statusTags';

cases('StatusTags: ', ({ status , error }) => {
  expect(shallow(<Status status={status} error={error}/>)).toMatchSnapshot();
}, [
  { status: 'sucess' },
  { status: 'error', error: 'validation' },
  { status: 'error', error: 'system' },
  { status: 'error', error: 'decompress' },
  { status: 'error', error: 'duplicate_batch' },
  { status: 'error', error: 'empty_batch' }
]);
