import React from "react";
import { Link, useLocation} from "react-router-dom";
import logo from '../images/logo.png';

const Navbar = () => {
  let location = useLocation();
  // useEffect(()=> {
  //   // console.log(location.pathname);
  // }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-end" to="/">
          <img src={logo} alt="Logo" width="30px" height="30px" className="mx-2"/>
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Singup
              </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
