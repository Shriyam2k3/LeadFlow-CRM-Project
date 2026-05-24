import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-2xl w-96"
      >

        <h1 className="text-4xl text-white font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-slate-700 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 py-3 rounded-lg text-white hover:bg-blue-600"
        >
          Register
        </button>

      </form>

    </div>
  );
}