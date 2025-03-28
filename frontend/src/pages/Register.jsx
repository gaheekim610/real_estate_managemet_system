import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosConfig";

import useFormValidation from "../hooks/useFormValidation";
import validate from "../utils/validate";
import AlertMessage from "../components/AlertMessage";

const Register = ({ role }) => {
  const [alert, setAlert] = useState(null);
  const { formData, errors, handleChange, resetForm, isValidated } =
    useFormValidation(
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
    if (!isValidated) {
      setAlert({
        type: "error",
        message: "Missing or invalid input fields",
      });
      return;
    }

    try {
      await axiosInstance.post("/api/auth/register", formData);
      setAlert({
        type: "success",
        message: "Registration successful. Please log in",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setAlert({
        type: "error",
        message: errMsg,
      });
    }
  };

  useEffect(() => {
    resetForm(role);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      {alert && (
        <div className="flex justify-center mt-4">
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
      <div className="max-w-md mx-auto mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded"
        >
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
                value={formData.agentname}
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
                value={formData.agentcode}
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
            disabled={!isValidated}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
