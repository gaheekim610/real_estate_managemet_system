import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import useFormValidation from "../hooks/useFormValidation";
import validate from "../utils/validate";
import { useEffect, useState } from "react";
import AlertMessage from "../components/AlertMessage";

const Login = () => {
  const [alert, setAlert] = useState(null);

  const { formData, errors, handleChange } = useFormValidation(
    {
      email: "",
      password: "",
    },
    validate
  );
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", formData);
      login(response.data);

      setAlert({
        type: "success",
        message: "Successfully Log in",
      });
      setTimeout(() => {
        navigate("/tasks");
      }, 3000);
    } catch (error) {
      // alert("Login failed. Please try again.");
      const errMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      setAlert({
        type: "error",
        message: errMsg,
      });
    }
  };

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
      {" "}
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
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
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

          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
