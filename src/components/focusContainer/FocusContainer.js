import React, { useEffect, useRef } from 'react';

// see, https://stackoverflow.com/a/53188569
const FocusContainer = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return <div {...props} ref={ref} tabIndex="-1" />;
};

export default FocusContainer;
