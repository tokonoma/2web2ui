// import React from 'react';
// import MultiEmailField from '../MultiEmailField';
// import useMultiEmailField from '../useMultiEmailField';

// describe('MultiEmailField', () => {
//   const subject = (props) => {
//     const {
//       handleMultiEmailChange,
//       handleMultiEmailKeyDownAndBlur,
//       handleMultiEmailRemove,
//       setMultiEmailError,
//       setMultiEmailValue,
//       setMultiEmailList,
//       multiEmailValue,
//       multiEmailList,
//       multiEmailError
//     } = useMultiEmailField();

//     return (
//       <MultiEmailField
//         id="multi-email-email-to"
//         label="To:"
//         name="emailTo"
//         onChange={(e) => handleMultiEmailChange(e)}
//         onKeyDownAndBlur={(e) => handleMultiEmailKeyDownAndBlur(e)}
//         onRemoveEmail={handleMultiEmailRemove}
//         error={multiEmailError}
//         value={multiEmailValue}
//         emailList={multiEmailList}
//         {...props}
//       />
//     );
//   };

//   it('renders', () => {
//     const wrapper = subject();

//     console.log(wrapper.debug());
//   });
// });
