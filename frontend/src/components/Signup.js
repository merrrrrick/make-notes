import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const Signup = ({ toggleFlip, showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "", // Added cpassword here
  });
  
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password, cpassword } = credentials;

    // Check if password and confirm password match
    if (password !== cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    // Proceed with signup request if passwords match
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      showAlert("Account Created Successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup bcg-img">
        <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          name="name"
          id="name"
          type="text"
          value={credentials.name}
          onChange={onChange}
          required
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          name="email"
          id="email"
          type="email"
          value={credentials.email}
          onChange={onChange}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          name="password"
          id="password"
          type="password"
          minLength={5}
          value={credentials.password}
          required
          onChange={onChange}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Confirm Password"
          name="cpassword"
          id="cpassword"
          type="password"
          minLength={5}
          value={credentials.cpassword}
          required
          onChange={onChange}
        />
        <MDBBtn color="primary">Sign Up</MDBBtn>
        <p className="my-3">
          Already have an account?{" "}
          <span onClick={toggleFlip} style={{ cursor: "pointer", color: "blue" }}>
            Login
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
