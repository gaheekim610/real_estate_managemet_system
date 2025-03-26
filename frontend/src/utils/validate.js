const validate = (values) => {
  console.log("validate values", values);

  let errors = {};

  // * name : min 1, max 30, only letter
  if (!values.name || !values.name.trim()) {
    errors.name = "Name should be at least 1 letter";
  } else if (values.name.length > 30) {
    errors.name = "Name should not exceed 30 characters";
  } else if (!/^[A-Za-z]+$/.test(values.name)) {
    errors.name = "Name should only contain letters";
  }

  if (!values.emil) {
    // * email: include “@”
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // * password: at leat one upper letter, one number, Min 7
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Password should be between 6 and 12 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password should contain at least one uppercase letter";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Password should contain at least one number";
  }
  // * agent name: min 1, max 30,
  if (!values.agentname || !values.agentname.trim()) {
    errors.agentname = "Agent name is required";
  } else if (values.agentname.length > 30) {
    errors.agentname = "Agent name should not exceed 30 characters";
  } else if (!/^[A-Za-z]+$/.test(values.agentname)) {
    errors.agentname = "Agent name should only contain letters";
  }

  // * agent registration code: text and number only
  if (!values.agentcode) {
    errors.agentcode = "Agent code is required";
  } else if (!/^[A-Za-z0-9]+$/.test(values.agentcode)) {
    errors.agentcode = "Agent code should contain only letters and numbers";
  }

  return errors;
};

export default validate;
