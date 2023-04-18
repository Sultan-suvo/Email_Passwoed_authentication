import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {

    // const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        setSuccess('')
        setError('')

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email, password);

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers')
            return;
        }
        else if (password.length > 6) {
            setError('Please add at least 6 characters in your password')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has been created Successfully')
                sendVerificationEmail(result.user)
                updateUserData(result.user, name)
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })
    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('n on o')
            })
    }

    const updateUserData = (name, user) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('User name updated');
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    const handleEmailChange = (e) => {
        // console.log(e.target.value);
        // setEmail(e.target.value);
    }

    const handlePasswordBlur = (e) => {
        // console.log(e.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 mx-auto rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4 mx-auto rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input className='w-50 mb-4 mx-auto rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your password' required />
                <br />
                <input className='btn btn-pimary' type="submit" value="Register" />
            </form>
            <p>Already have an account? please <Link to='/login'>Login</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;