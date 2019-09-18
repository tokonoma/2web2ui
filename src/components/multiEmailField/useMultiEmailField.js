// NOTE - should this be in `src/hooks` instead of co-locating?
import { useState } from 'react';
import { isEmailAddress } from 'src/helpers/email';

const useMultiEmailField = (value = '', emailList = [], error = '') => {
  const [multiEmailValue, setValue] = useState(value);
  const [multiEmailError, setError] = useState(error);
  const [multiEmailList, setList] = useState(emailList);

  const handleMultiEmailKeyDownAndBlur = (e) => {
    // prevent form submission when using the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
    }

    // Remove the last email from the list when the user deletes
    // and no in progress value is present in the field
    if (e.keyCode === 8 && !multiEmailValue) {
      setList(multiEmailList.filter((email, index) => {
        if (index + 1 !== multiEmailList.length) {
          return email;
        }
      }));
    }

    if (e.type === 'blur' || e.keyCode === 32) {
      if (e.type === 'keydown') {
        e.preventDefault(); // Prevents spaces from being written to the field
      }

      const isValidEmail = isEmailAddress(multiEmailValue);

      // A valid email address is entered, and it is added to the array
      if (isValidEmail) {
        setList([...multiEmailList, { email: multiEmailValue }]);
        setValue('');
        setError('');
      }

      // Throw an error on the field if:
      // 1. There is some text entry in the field
      // 2. The entered email is not valid or
      // 3. The entered email already exists in the list
      if (value && !isValidEmail) {
        setError('Please enter a valid email address');
      }
    }
  };

  const handleMultiEmailChange = (e) => {
    setValue(e.target.value);
    setError('');
  };

  const handleMultiEmailRemove = (target) => {
    setList(multiEmailList.filter((item) => {
      if (target !== item) {
        return item;
      }
    }));
  };

  const setMultiEmailValue = (str) => {
    setValue(str);
  };

  const setMultiEmailError = (bool) => {
    setError(bool);
  };

  const setMultiEmailList = (arr) => {
    setList(arr);
  };

  return {
    multiEmailValue,
    multiEmailList,
    multiEmailError,
    setMultiEmailValue,
    setMultiEmailError,
    setMultiEmailList,
    handleMultiEmailChange,
    handleMultiEmailKeyDownAndBlur,
    handleMultiEmailRemove
  };
};

export default useMultiEmailField;
