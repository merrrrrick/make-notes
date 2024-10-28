import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import AuthContainer from "./components/AuthContainer";
import { useState } from "react"

function App() {
  const [ alert, setAlert ] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<AuthContainer isLogin={true} showAlert={showAlert}/>} />
            <Route path="/signup" element={<AuthContainer isLogin={false} showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
