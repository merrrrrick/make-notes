import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


const Login = (props) => {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // not to reload page on clicking bbutton
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    if (json.success) {
      //redirect and save auth token
      localStorage.setItem('Token', json.authToken);
      props.showAlert("Logged in Successfully", "success")
      navigate("/");

    }
    else {
      props.showAlert("Wrong credentials", "danger")

    }

  }

  return (
    <>
      <form onSubmit={handleSubmit} className='container login-form'>
        <h1>Login</h1>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">Email  address</label>
          <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
          <p id="emailHelp" className="form-text">We'll never share your email with anyone else.</p>
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' />
          <p className='form-text'>Atleast 5 characters</p>
        </div>
        <button disabled={credentials.password.length < 5 || credentials.email.length < 3} type="submit" className="btn btn-dark" >Login</button>
        <div className="no-accnt">
          <p>Dont have an account? <Link className="white" to="/signup">Signup</Link></p>
        </div>
      </form>
    </>
  )
}

export default Login