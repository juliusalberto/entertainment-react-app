import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import movieIcon from "../assets/logo.svg";
import Input from '../components/Input/Input';
import Form from '../components/Form/Form';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser, navigate]);

  const inputs = [
    <Input key="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />,
    <Input key="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
    }
  };

  if (currentUser) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <div className="min-h-screen bg-very-dark-blue flex flex-col items-center justify-start px-4">
      <div className="mb-32 mt-8">
        <img src={movieIcon} alt="Movie Icon" />
      </div>
      
      <div className="h-2/5  w-full flex flex-col items-center justify-center lg:w-2/5 mb-6">
        <Form 
          inputs={inputs}
          header="Login"
          buttonText="Login to your account"
          belowText="Don't have an account?"
          belowUnderlineText="Sign up"
          navigate={() => navigate("/signup")}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default LoginPage;