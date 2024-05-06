import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expression for password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Validate fields
    if (formData.firstName.trim().length < 6) {
      alert("First name should be at least 6 characters long.");
      return;
    }
    if (formData.lastName.trim().length < 6) {
      alert("Last name should be at least 6 characters long.");
      return;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!formData.password.trim() || !passwordRegex.test(formData.password)) {
      alert(
        "Please enter a valid password. Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Store in localStorage and navigate
    localStorage.setItem("username", formData.email);
    localStorage.setItem("password", formData.password);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate(-1);
  };

  return (
    <div className="signup-container">
      <span>
        <h2>Sign Up</h2>
      </span>
      <form onSubmit={handleSubmit} className="signup-form">
        <section>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="signup-input"
          />
        </section>

        <section>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="signup-input"
          />
        </section>

        <section>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="signup-input"
          />
        </section>

        <section>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="signup-input"
          />
        </section>

        <section>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="signup-input"
          />
        </section>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
