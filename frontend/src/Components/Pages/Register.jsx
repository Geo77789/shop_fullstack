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

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form>
      <input name="username" placeholder="username" onChange={handleChange} />
      <input name="email" placeholder="email" onChange={handleChange} />
      <input name="password" placeholder="password" onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
}

export default Register;
