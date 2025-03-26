import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosConfig";

import useFormValidation from "../hooks/useFormValidation";
import validate from "../utils/validate";

const Register = ({ role }) => {
  const { formData, errors, handleChange, resetForm } = useFormValidation(
    {
      name: "",
      email: "",
      password: "",
      role: "",
      agentname: "",
      agentcode: "",
    },
    validate
  );
  const navigate = useNavigate();

  const isAgent = role === "agent";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/auth/register", formData);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    resetForm(role);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isAgent ? "Agent Register" : "Register"}
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.name && <p className="text-red-600 mb-4">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.email && <p className="text-red-600 mb-4">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-600 mb-4">{errors.password}</p>
        )}

        {isAgent ? (
          <>
            <input
              type="text"
              name="agentname"
              placeholder="Agent Name"
              value={formData.agentName}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />
            {errors.agentname && (
              <p className="text-red-600 mb-4">{errors.agentname}</p>
            )}

            <input
              type="text"
              name="agentcode"
              placeholder="Agent code"
              value={formData.agentName}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            />
            {errors.agentcode && (
              <p className="text-red-600 mb-4">{errors.agentcode}</p>
            )}
          </>
        ) : (
          <></>
        )}

        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
