import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "./../components/forms/Field";
import AuthAPI from "../services/authAPI";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {
    let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async event => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre formulaire !");
      return;
    }

    try {
      await AuthAPI.register(user);
      setErrors({});

      // TODO : Flash success
      toast.success(
        "Vous êtes désormais inscrit, vous pouvez vous connecter !"
      );
      navigate("/login");
    } catch (error) {
    console.log(error);
    console.log(error.response.data);
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="username"
          placeholder="Votre username"
          error={errors.name}
          value={user.name}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Adresse email"
          placeholder="Votre adresse email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe ultra sécurisé"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirmation de mot de passe"
          type="password"
          placeholder="Confirmez votre super mot de passe"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />

        <div className="form-group  mt-3">
          <button type="submit" className="btn btn-outline-danger">
            Confirmation
          </button>
          <Link to="/login" className="btn btn-link text-danger">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;