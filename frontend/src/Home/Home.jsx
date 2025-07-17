import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Header.css';
import './Body.css';

function Home() {
  const [userName, setUserName] = useState("");
  const [searchCategory, setSearchCategory] = useState(""); // State for case category
  const [searchName, setSearchName] = useState(""); // State for lawyer name
  const navigate = useNavigate();

  useEffect(() => {
    const storeName = localStorage.getItem("userName");
    setUserName(storeName || "login/signup");
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:2000/api/searchUser?caseCategory=${searchCategory}&name=${searchName}`);
      const result = await response.json();
      if (result.length > 0) {
        // Store search results in localStorage or pass to the next page
        localStorage.setItem("searchResults", JSON.stringify(result));
        navigate("/MultipleProfile");
      } else {
        alert("No matching users found.");
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  return (
    <div className="containerHome">
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
          <button className="profile"><Link to="/Verify">Create profile</Link></button>
        </div>
      </header>

      <div className="middlepart">
        <div className="mainhead">
          Find & Hire <br />
          Attorney for your cases
        </div>

        <div className="subhead">
          Lawyer and Law Firms. Find Lawyers In Global. Executives Lawyers and
          Firms
        </div>

        <div className="inputbox">
        <div className="dropdown">
          <label htmlFor="">Case category</label>
          <select name="Case" id="caseSelection" onChange={(e) => setSearchCategory(e.target.value)}>
            <option value="">Select a Category</option>
            <option value="Civil Case">Civil Case</option>
            <option value="Criminal Case">Criminal Case</option>
            <option value="Administrative Case">Administrative Case</option>
          </select>
        </div>

          <div className="bar"></div>

          <div className="searchbox">
          <label htmlFor="">Search by Name</label>
          <input type="text" className="lawyername" onChange={(e) => setSearchName(e.target.value)} />
        </div>

        <div className="submitbutton">
          <button className="button" onClick={handleSearch}>Submit</button>
        </div>
        </div>

        <div className="lowerhead">
          <div className="popular">Popular: </div>

          <div className="remain">
            Civil, Administrative, Criminal and more...
          </div>
        </div>
      </div>

      <img className="logo1" src=".\images\icons8-law-document-100.png" alt="logo" />
      <img src=".\images\download (1).png" alt="" className="logo2" />
      <img
        src=".\images\download (1).png"
        alt=""
        className="logo3"
      />
      <img src=".\images\icons8-court-50.png" alt="" className="logo4" />
      <img src=".\images\icons8-law-document-100.png" alt="" className="logo5" />
      <img src=".\images\icons8-court-50.png" alt="" className="logo6" />

      <div className="redsmall"></div>

      <div className="greenbig"></div>

      <div className="greenbig2"></div>
      <div className="redsmall2"></div>
    </div>
  );
}

export default Home;
