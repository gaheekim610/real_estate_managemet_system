import { useState } from "react";

const useFormValidation = (initialValues, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const handleRoles = (role) => {
    setFormData({ ...formData, role: role });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange name/value", name, value);

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

  const resetForm = () => {
    setFormData(() => initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleRoles,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
