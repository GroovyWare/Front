import { useState } from "react";

const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const [message, setMessage] = useState('');
    const [isValid, setIsValid ] = useState(false); 

    const onChange = (e) => {
      const result = validator(e.target.value); // return { isValid: true, message: '' };
      setValue(e.target.value);
      if (result.isValid) {
        setMessage(result.success);
        setIsValid(true);
      } else {
        setMessage(result.error);
        setIsValid(false);
      }
    };
  
    return { value, onChange, message, isValid };
  };


  export default useInput;