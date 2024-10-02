import React from 'react';
import movieIcon from "../assets/logo.svg"
import Input from '../components/Input/Input';
import Form from '../components/Form/Form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [error, setError] = useState('');

    const inputs =   [<Input key="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />, 
        <Input key="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>,
        <Input key="repeat" type="password" onChange={(e) => setRepeat(e.target.value)} placeholder="Repeat Password"/>]

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (password !== repeat) {
                throw new Error("The passwords do not match!")
            }

            console.log(`${email} ${password}`)
            await handleSignUp(email, password)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleSignUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up:", user);
            // Handle successful sign-up (e.g., redirect to home page)
        } catch (error) {
            console.error("Error signing up:", error.message);
            // Handle errors (e.g., display error message to user)
        }
    };

    return (
        <div className="min-h-screen bg-very-dark-blue flex flex-col items-center justify-start px-4">
            {/* Logo */}
            <div className="mb-32 mt-8">
                <img src={movieIcon} alt="" srcset="" />
            </div>
            
            {/* Login Form */}
            <div className="h-2/5 w-full flex flex-col items-center mb-6">
                <Form 
                inputs={inputs} header="Sign up" 
                buttonText="Sign up" 
                belowText="Already have an account?" 
                belowUnderlineText="Sign in"
                navigate={() => navigate("/signin")}
                onFormSubmit={handleSubmit}
                />
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
  );
};

export default SignupPage;