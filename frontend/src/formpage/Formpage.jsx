import React, { useState } from "react";
import "./Formpage.css";
import { useNavigate } from "react-router-dom";

function Formpage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [location, setLocation] = useState("");
  const [caseType, setCaseType] = useState(""); // New state for case type
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      experience,
      aboutme,
      location,
      caseType, // Include the new case type in the form data
    };

    try {
      const response = await fetch("http://localhost:2000/api/saveUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTimeout(() => navigate("/"), 2000);

        // Clear form fields after submission
        setFirstname("");
        setLastname("");
        setEmail("");
        setExperience("");
        setAboutme("");
        setLocation("");
        setCaseType(""); // Reset the new case type field
      } else {
        alert("Failed to save user data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="bodyy">
      <div className="form-container">
        <h1>Let's get started</h1>
        <form onSubmit={handleSubmit}>
          <div className="namediv">
            <label>First Name</label>
            <input
              type="text"
              className="firstnamebox"
              placeholder="Enter First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              className="lastnamebox"
              placeholder="Enter Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          {/* New Case Type Selection */}
          <div className="casediv">
            <label>Kind of Cases You Handle</label>
            <select
              className="casebox"
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select case type
              </option>
              <option value="Civil Case">Civil Case</option>
              <option value="Administrative Case">Administrative Case</option>
              <option value="Criminal Case">Property Case</option>
            </select>
          </div>

          <div className="emaildiv">
            <label>Email</label>
            <input
              type="text"
              className="emailbox"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="experiencediv">
            <label>Experience</label>
            <textarea
              className="experiencebox"
              placeholder="Describe your experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="aboutmediv">
            <label>About me</label>
            <textarea
              className="aboutmebox"
              placeholder="Tell us about yourself"
              value={aboutme}
              onChange={(e) => setAboutme(e.target.value)}
            />
          </div>

          <div className="locationdiv">
            <label>Location</label>
            <input
              type="text"
              className="locationbox"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button className="buttton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Formpage;
