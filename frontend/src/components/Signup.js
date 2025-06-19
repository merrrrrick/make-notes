import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // not to reload page on clicking bbutton
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

        })
        const json = await response.json();
        if (json.success) {
            //redirect and save auth token
            localStorage.setItem('Token', json.authToken);
            props.showAlert("Account Created Successfully!", "success")
            navigate("/");
        }
        else {
            props.showAlert("Wrong credentials", "danger")
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='container signin-form'>
                <h1>Sign-up</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name='name' />
                </div>
                <div className="">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                    <p id="emailHelp" className="form-text">We'll never share your email with anyone else.</p>
                </div>
                <div className="">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' minLength={5} required />
                    <p className='form-text'>Atleast 5 characters</p>
                </div>
                <button disabled={credentials.password.length < 5 || credentials.name.length < 3} type="submit" className="btn btn-dark" >Signup</button>
                <div className="no-accnt">
                    <p>ALready have an account? <Link className="white" to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Signup 