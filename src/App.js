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
import CreateArticlePage from "./pages/CreateArticlePage";
import ArticlePage from "./pages/ArticlePage";
import AuthAPI from "./services/authAPI";
import RegisterPage from "./pages/RegisterPage";
import PostsAdminPages from "./pages/PostsAdminPage";
import UsersAdminPages from "./pages/UsersAdminPages"
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/js/bootstrap.bundle';
import "react-toastify/dist/ReactToastify.css";
import './App.css';



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
            <Route path="/profil" element={ <PrivateRoute/>}>
              <Route path="/profil" element={<ProfilPage/> }/>
            </Route>
            <Route path="/articles" element={ <PrivateRoute />}>
              <Route path="/articles" element={<ArticlesPages/> }/>
            </Route>
            <Route path="/createarticle" element={ <PrivateRoute />}>
              <Route path="/createarticle" element={<CreateArticlePage/> }/>
            </Route>
            <Route path="/article/:id" element={ <PrivateRoute />}>
              <Route path="/article/:id" element={<ArticlePage/> }/>
            </Route>
            <Route path="/admin/posts/admin" element={ <PrivateRoute />}>
              <Route path="/admin/posts/admin" element={<PostsAdminPages/> }/>
            </Route>
            <Route path="/admin/users/admin" element={ <PrivateRoute />}>
              <Route path="/admin/users/admin" element={<UsersAdminPages/> }/>
            </Route>
            <Route path="/" element={<HomePage/> }/>
          </Routes>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

export default App;
