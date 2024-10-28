import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure your styles are imported

const AuthContainer = ({ isLogin, showAlert}) => {
  const [flipped, setFlipped] = useState(!isLogin); // Initially, flip based on isLogin
  const navigate = useNavigate();

  useEffect(() => {
    setFlipped(!isLogin);
  }, [isLogin]);

  const handleToggleFlip = () => {
    if (flipped) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className={`flip-container ${flipped ? "flipped" : ""}`}>
      <div className="flipper">
        {/* Login form (front) */}
        <div className="front">
          <Login toggleFlip={handleToggleFlip} showAlert={showAlert}/>
        </div>

        {/* Signup form (back) */}
        <div className="back">
          <Signup toggleFlip={handleToggleFlip} showAlert={showAlert}/>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
