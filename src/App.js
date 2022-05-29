// Les imports importants
import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage"
import ArticlesPages from "./pages/ArticlesPages";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      <HashRouter>
        <Navbar />

        <main className="container pt-5">
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/profil" element={ <PrivateRoute> <ProfilPage/> </PrivateRoute>}/>
            <Route path="/articles" element={ <PrivateRoute >{<ArticlesPages/>} </PrivateRoute>}/>
            <Route path="/" element={<HomePage/> }/>
          </Routes>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

export default App;
