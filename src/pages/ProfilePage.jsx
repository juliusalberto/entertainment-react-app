import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import movieIcon from "../assets/logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (!currentUser) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <div className="bg-very-dark-blue flex flex-col items-center justify-start px-4">
      <div className="mb-32 mt-8">
        <img src={movieIcon} alt="Movie Icon" />
      </div>
      
      <div className="bg-semi-dark-blue rounded-lg p-6 w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Profile</h2>
        <p className="text-white mb-2">Email: {currentUser.email}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red py-3 rounded-md text-white font-bold mt-4 hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;