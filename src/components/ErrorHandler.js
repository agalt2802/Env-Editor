import React from "react";
import { Alert } from "reactstrap";

const errorContext = React.createContext(null);

export default function ErrorHandler({ setToken })
{
  const { errors, setErrors } = useState([]);

  const addError = (error) =>
  {
  };

  return (
    errors.forEach((error) => 
    {
      <Alert color="danger">
        {error.message}
      </Alert>
    })
  );
}

export const addError = (error) =>
{
  const { errors, setErrors } = React.useContext(errorContext);

  errors.push(error);

  setErrors(errors);
}