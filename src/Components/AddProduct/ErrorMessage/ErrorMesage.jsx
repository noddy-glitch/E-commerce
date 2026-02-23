import React from 'react'
import { ErrorMessage } from "formik";


const FormError = () => {
  return (
   <ErrorMessage name={name}>
    {(msg) => <div className="error">{msg}</div>}
   </ErrorMessage>
  );
};

export default FormError
