import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté 😁");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
        Groupomania
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/articles">
              Articles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profil">
              Mon profil
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav d-flex">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Inscription
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">
                  Connexion !
                </NavLink>
              </li>
            </>
          )) || (
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-danger">
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;