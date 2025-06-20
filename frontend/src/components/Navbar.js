import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';



 const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const logout = () =>{
        localStorage.removeItem('Token');
        navigate('/login')
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black  py-1 " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MakeNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        
                        {!localStorage.getItem('Token')?<form className="d-flex" role="search">
                        <Link className="btn btn-outline-light mx-1" to='/login' role="button">Login</Link>
                        <Link className="btn btn-outline-light mx-1" to='/signup' role="button">Signup</Link>
                        </form>: <button className="btn btn-outline-light mx-1" onClick={logout}>Logout</button>
                        }
                    </div>
                </div>
            </nav>

        </>
    )
} 

export default Navbar;
