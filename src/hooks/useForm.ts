import { useState } from 'react';

const useForm = (callback:any) => {
  const [values, setValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const auxValues = { ...values };
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleSubmit = (callback:any) => (event:any) => {
    event.preventDefault();
    setLoading(true);
    callback();
    setLoading(false);
  };

  return [{ values, loading }, handleChange, handleSubmit];
};

export default useForm;