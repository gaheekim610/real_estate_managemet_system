import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    agentname: "",
    agentcode: "",
  });
  const navigate = useNavigate();
  const { role } = useParams();

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
    if (role) {
      setFormData((prev) => ({ ...prev, role: role }));
    }
  }, [role]);

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isAgent ? "Agent Register" : "Register"}
        </h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        {isAgent ? (
          <>
            <input
              type="agentname"
              placeholder="Agent Name"
              value={formData.agentName}
              onChange={(e) =>
                setFormData({ ...formData, agentname: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="agentcode"
              placeholder="Agent code"
              value={formData.agentName}
              onChange={(e) =>
                setFormData({ ...formData, agentcode: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
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
