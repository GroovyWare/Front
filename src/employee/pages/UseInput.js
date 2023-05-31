import { useState } from "react";

const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
      const result = validator(e.target.value); // return { isValid: true, message: '' };
      setValue(e.target.value);
      if (result.isValid) {
        setMessage(result.success);
      } else {
        setMessage(result.error);
      }
    };
  
    return { value, onChange, message };
  };


  export default useInput;