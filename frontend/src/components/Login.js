import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Login = ({ toggleFlip, showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      showAlert("Logged In Successfully", "success"); // Use showAlert directly
      navigate("/");
    } else {
      showAlert("Invalid Credentials", "danger"); // Use showAlert directly
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <MDBInput
          wrapperClass="mb-4"
          id="email"
          name="email"
          value={credentials.email}
          label="Email"
          type="email"
          onChange={onChange}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="password"
          name="password"
          value={credentials.password}
          label="Password"
          type="password"
          onChange={onChange}
        />
        <MDBBtn color="primary">Login</MDBBtn>
        <p className="my-3">
          Don't have an account?{" "}
          <span
            onClick={toggleFlip}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
