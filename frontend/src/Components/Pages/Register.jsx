import { useState } from "react";
import { registerUser } from "../../utils/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await registerUser(form);

    if (data._id) {
      alert("User created successfully");
      navigate("/login");
    }
  };

  return (
    <form>
      <h1>Create an account</h1>

      <input name="username" placeholder="username" onChange={handleChange} />
      <input name="email" placeholder="email" onChange={handleChange} />
      <input name="password" placeholder="password" onChange={handleChange} />
      <input
        name="firstName"
        placeholder="first name"
        onChange={handleChange}
      />
      <input name="lastName" placeholder="last name" onChange={handleChange} />
      <input name="address" placeholder="address" onChange={handleChange} />

      <button type="submit" onClick={handleSubmit}>
        Welcome
      </button>
    </form>
  );
}

export default Register;
