import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import Carddetails from "./Carddetails"; // Import the Carddetails component

function MultipleProfile() {
  const [userName, setUserName] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    // Get the user's name from local storage
    const storeName = localStorage.getItem("userName");
    setUserName(storeName || "guest");

    // Get the search results from localStorage
    const searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");
    setDetails(searchResults);
  }, []);

  return (
    <div className="multipleprofilecontainer">
      <header>
      <div className="logo">
          <img
            className="imagelogo"
            src="./Images/icons8-legal-64 (2).png"
            alt="Legalease"
          />
          <div className="legalease">
            <p className="webname">Legal-Ease</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>Articles</li>
            <li>Category</li>
          </ul>
        </nav>
        <div className="buttons">
          <button className="login"><Link to="/signup">{userName}</Link></button>
          <button className="profile"><Link to="/Formpage">Create profile</Link></button>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          boxSizing: "border-box",
          margin: "10px",
          paddingTop: "15px",
          gap: "26px",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {/* Display matching user details */}
        {details.length > 0 ? (
          details.map((detail) => (
            <Wrapper key={detail._id}>
              <Carddetails detail={detail} />
            </Wrapper>
          ))
        ) : (
          <p>No matching users found.</p>
        )}
      </div>
    </div>
  );
}

export default MultipleProfile;