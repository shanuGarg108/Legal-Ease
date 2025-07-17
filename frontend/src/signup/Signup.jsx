import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signup.css';

function Signup() {
  // State management for form data, error, and success messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // For navigating to different routes

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesigninchange = () =>{
    navigate("/signin")
  }

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send signup request to the backend API
      const response = await axios.post("http://localhost:3000/api/signup", formData);

      if (response.data.msg === 'User registered successfully') {
        setSuccess("Signup successful! Redirecting to messages...");
        localStorage.setItem("userName", formData.name);
        setTimeout(() => navigate("/"), 1000); // Redirect after success
      } else {
        setError(response.data.errors[0].msg || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="leftside">
        <div className="img">
          <img src="./Images/icons8-legal-64 (2).png" alt="logo" />
        </div>
        <div className="Legalease">Legal-Ease</div>
        <div className="paragraph">Empowering your legal journey, one connection at a time</div>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>

      <div className="rightside">
        <div className="heading">Create an account</div>
        <div className="subheading">Sign up now to get out of your worries</div>

        <form onSubmit={handleSignup}>
          {/* Input fields for signup */}
          <div className="name">
            <p id="p1">Your Name</p>
            <input autoComplete="off" id="input1" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>
          <div className="email">
            <p id="p2">Email</p>
            <input autoComplete="off" id="input2" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="password">
            <p id="p3">Password</p>
            <input id="input3" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div className="confirm">
            <p id="p4">Confirm password</p>
            <input id="input4" type="password" autoComplete="off" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
          </div>
          
          {/* Display error or success messages */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button className="submit" type="submit">Submit</button>
        </form>
        
        <div className="or-divider">
          <div className="line"></div>
          <div className="or-text">OR</div>
          <div className="line"></div>
        </div>
        
        <button className="google" onClick={handlesigninchange}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Signup;
