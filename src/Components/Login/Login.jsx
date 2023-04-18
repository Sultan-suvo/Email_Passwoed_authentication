import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()

    const hadleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('')
        setSuccess('')

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase.')
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add a special character in your password.')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 character long')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('User login successfully');
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    
    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <Form onSubmit={hadleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter your password" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>Forget password? please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></p>
            <p>New to this website? please <Link to='/register'>Register</Link></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;