import { useState } from "react";

const useSingUpForm = (defaultValues, callback) => {
  const [inputs, setInputs] = useState(defaultValues);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return { inputs, setInputs, handleInputChange, handleSubmit };
};
export default useSingUpForm;
