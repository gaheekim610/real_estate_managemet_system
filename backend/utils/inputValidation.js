const validateUserInput = ({
  name,
  email,
  password,
  role,
  agentname,
  agentcode,
  title,
}) => {
  const errors = [];

  // Name: min 1, max 30, only letters
  if (!name || !name.trim()) {
    errors.push("Name should be at least 1 letter");
  } else if (name.length > 30) {
    errors.push("Name should not exceed 30 characters");
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    errors.push("Name should only contain letters");
  }

  // Email: valid format
  if (!email) {
    errors.push("Email is required");
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
    errors.push("Invalid email address");
  }

  // Password: min 6, max 20, at least 1 uppercase, 1 number
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 6 || password.length > 20) {
    errors.push("Password should be between 6 and 12 characters");
  } else if (!/[A-Z]/.test(password)) {
    errors.push("Password should contain at least one uppercase letter");
  } else if (!/[0-9]/.test(password)) {
    errors.push("Password should contain at least one number");
  }

  // Role
  if (!role) {
    errors.push("Role is required");
  }

  if (role === "agent") {
    // Agent name
    if (!agentname || !agentname.trim()) {
      errors.push("Agent name is required");
    } else if (agentname.length > 30) {
      errors.push("Agent name should not exceed 30 characters");
    } else if (!/^[A-Za-z\s]+$/.test(agentname)) {
      errors.push("Agent name should only contain letters");
    }

    // Agent code: only letters and numbers
    if (!agentcode) {
      errors.push("Agent code is required");
    } else if (!/^[A-Za-z]+$/.test(agentcode)) {
      errors.push("Agent code should contain only letters and numbers");
    }
  }

  // Title
  if ("title" in arguments[0] && !title) {
    errors.push("Title is required");
  }

  return errors;
};

module.exports = validateUserInput;
// const validateUserInput = ({
//   name,
//   email,
//   password,
//   role,
//   agentname,
//   agentcode,
// }) => {
//   const errors = [];

//   if (!name) errors.push("Name is required");
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//     errors.push("Invalid email");
//   if (
//     !password ||
//     password.length < 6 ||
//     !/[A-Z]/.test(password) ||
//     !/[0-9]/.test(password)
//   ) {
//     errors.push(
//       "Password must be at least 6 characters and contain an uppercase letter and number"
//     );
//   }
//   if (!role) errors.push("Role is required");

//   return errors;
// };

// module.exports = validateUserInput;
