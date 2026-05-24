import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      console.log(error.response);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Login
        </button>

        <p onClick={() => navigate("/register")}
        className="text-blue-400 mt-5 text-center cursor-pointer">
          Create New Account
        </p>

      </form>

    </div>
  );
}