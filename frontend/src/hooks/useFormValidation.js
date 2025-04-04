import { useState } from "react";

const useFormValidation = (initialValues, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(validate({ ...formData, [name]: value }));
  };

  const handleSubmit = (e, formSubmit) => {
    e.preventDefault(); // prevent page refreshing
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsValidated(true);
      formSubmit();
    }
  };

  const resetForm = (role) => {
    setFormData(() => ({ ...initialValues, role: role }));
    setErrors({});
  };

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    isValidated,
  };
};

export default useFormValidation;
