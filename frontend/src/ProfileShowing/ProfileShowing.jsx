import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Get the profile ID from the URL
import { Link } from 'react-router-dom';
import './Header.css';
import './Body.css';
import { useNavigate } from 'react-router-dom';

function ProfileShowing() {
  const { id } = useParams();  // Get the ID from the URL
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  useEffect(() => {

    const storeName = localStorage.getItem("userName");
    setUserName(storeName || "guest");
    // Fetch the profile details from the backend using the ID
    const fetchProfile = async () => {

      
      try {
        const response = await fetch(`http://localhost:2000/api/getUserProfile/${id}`);
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  const changepage = ()=>{
    navigate('/messages')
  }

  return (
    <div className="profilediv">
      <header>
        <div className="logo">
         <img src="./Images/icons8-legal-64 (2).png" alt="Legal-ease logo" className="imagelogo" />
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

      <div className="profile-container">
        <div className="profile-image-wrapper">

        </div>
        <div className="profile-info">
          <h2 className="nametag">{profile.firstname} {profile.lastname}</h2>
          <p className="usernametag">@{profile.username}</p>
          <div className="profile-actions">
            <button className='messagebuttons' onClick={changepage}>Message</button>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-details-left">
            <h3>Experience</h3>
            <p>{profile.experience}</p>
            <h3>About me</h3>
            <p>{profile.aboutme}</p>
          </div>
          <div className="profile-details-right">
            <h3>Location</h3>
            <p>{profile.location}</p>
            <h3>Email</h3>
            <p>{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileShowing;
