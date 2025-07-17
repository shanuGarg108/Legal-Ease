import React, { useState } from "react";
import "./Formpage.css";
import { useNavigate } from "react-router-dom";

function Verify() {
  const [firstLetterName, setFirstLetterName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dobDate, setDobDate] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const verificationData = {
      phoneNo,
      firstLetterName,
      dobDate,
      dobMonth,
      dobYear,
    };

    try {
      // Send verification data to the backend
      const verificationResponse = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      });

      const verificationResult = await verificationResponse.text();
      
      if (verificationResult.includes("Successful Verification")) {
        // If verification is successful, save user data
        // Assuming user data needs to be saved, you can add that part here if needed
        // For now, just redirect after successful verification
        setTimeout(navigate("/Formpage"), 2000)
      } else {
        alert("Verification failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="bodyy">
      <div className="form-container">
        <h1>Verify Your Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="namediv">
            <label>First letter of name</label>
            <input
              type="text"
              className="firstnamebox"
              placeholder="Enter First letter of name"
              value={firstLetterName}
              onChange={(e) => setFirstLetterName(e.target.value)}
            />
            <label>Mobile number</label>
            <input
              type="text"
              className="lastnamebox"
              placeholder="Enter Mobile number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="emaildiv">
            <label>DOB Date</label>
            <input
              type="text"
              className="emailbox"
              placeholder="Enter your birth date"
              value={dobDate}
              onChange={(e) => setDobDate(e.target.value)}
            />
          </div>

          <div className="experiencediv">
            <label>DOB Month</label>
            <input
              type="text"
              className="experiencebox"
              placeholder="Enter your birth month"
              value={dobMonth}
              onChange={(e) => setDobMonth(e.target.value)}
            />
          </div>

          <div className="aboutmediv">
            <label>DOB Year</label>
            <input
              type="text"
              className="aboutmebox"
              placeholder="Enter your birth Year"
              value={dobYear}
              onChange={(e) => setDobYear(e.target.value)}
            />
          </div>

          <button className="buttton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Verify;
