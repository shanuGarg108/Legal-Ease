import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use POST request instead of GET
      const response = await axios.post("http://localhost:3000/api/signin", {
        email: formData.email,
        password: formData.password,
      });

      // Assuming the response contains the user name
      const userName = response.data.name;

      // Save the user name to localStorage
      localStorage.setItem("userName", userName);

      // Redirect to the messages page
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.errors?.[0]?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="leftside">
        <div className="img">
          <img src="./Images/icons8-legal-64 (2).png" alt="logo" />
        </div>
        <div className="Legalease">Legal-Ease</div>
        <div className="paragraph">
          Empowering your legal Journey, one connection at a time
        </div>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>

      <div className="rightside">
        <div className="heading">Sign in to your account</div>
        <div className="subheading">
          Access your legal resources easily
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formcontainer">
            <div className="email">
              <p id="p2">Email</p>
              <input
                id="input2"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="password">
              <p id="p3">Password</p>
              <input
                id="input3"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="or-divider">
          <div className="line"></div>
          <div className="or-text">OR</div>
          <div className="line"></div>
        </div>

        <button className="google">Sign in with Google</button>
      </div>
    </div>
  );
}

export default Signin;
