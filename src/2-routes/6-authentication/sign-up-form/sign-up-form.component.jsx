import './sign-up-form.styles.scss'
import './sign-up-form.responsive.scss'
import { Fragment, useContext, useEffect, useState} from "react";

import { UserContext } from "../../../3-context/0-user.context";
import { AuthenticationContext } from "../../../3-context/1-authentication.context";
import { PaymentContext } from "../../../3-context/2-payment.context";
import { SelectContext } from "../../../3-context/5-select.context";

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, emailInUse, verificationEmail,} from "../../../4-utils/firebase.utils";

import FormInput from "../../../1-components/2-form-input/form-input.component";
import Loader from '../../../1-components/12-loader/loader.component';


const defaultFormFields = {
  nom: "",
  prenom: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const SignUpForm = () => {
  
  const { setAuthMethod } = useContext(AuthenticationContext);;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState()
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { nom, prenom, email, password, confirmPassword } = formFields
  
  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
      setIsMobile(window.innerWidth > 768 ? false : true)
  }
  useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const successAuth = async () => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { nom, prenom});
      resetFormFields();
      await verificationEmail(user);
      setAuthMethod("verif-email")
    } catch (error) {
        console.log(error);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailIsInUse = await emailInUse(email);
    if (emailIsInUse) 
    {
      setErrorMessage("Cette adresse e-mail est déjà associée à un compte");
      return
    }
    if (!validateEmail(email))
    {
      setErrorMessage("Merci d'utiliser une adresse e-mail valide")
      return
    }
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au minimum 6 caractères")
      return 
    }
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true)
    await successAuth()
  }
  return (
    <Fragment>
        <div className="sign-up-container">
          <h2>Inscription</h2>
          {!isMobile ? (
          <form onSubmit={handleSubmit}>
            <div className="double">
              <FormInput
                type="text"
                label="Prénom"
                required
                onChange={handleChange}
                name="prenom"
                autoComplete="off" 
                value={prenom}
              />
              <FormInput
                type="text"
                label="Nom"
                required
                onChange={handleChange}
                name="nom"
                autoComplete="off" 
                value={nom}
              />
            </div>
           
            <div className="double">
              <FormInput
                type="email"
                label="e-mail"
                required
                onChange={handleChange}
                name="email"
                autoComplete="off" 
                value={email}
              />
            </div>
            <div className="double">
              <FormInput
                type="password"
                label="Mot de passe"
                required
                onChange={handleChange}
                name="password"
                value={password}
              />
              <FormInput
                type="password"
                label="Confirmez votre mot de passe"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {loading ? (
              <button className="disabled-btn"><Loader animation={'sacade'}/></button>
            ) : (
              <button type="submit">S'inscrire</button>
            )}
          </form>
          ) : ( // responsive
          <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                label="Prénom"
                required
                onChange={handleChange}
                name="prenom"
                autoComplete="off" 
                value={prenom}
              />
              <FormInput
                type="text"
                label="Nom"
                required
                onChange={handleChange}
                name="nom"
                autoComplete="off" 
                value={nom}
              />
              <FormInput
                type="email"
                label="e-mail"
                required
                onChange={handleChange}
                name="email"
                autoComplete="off" 
                value={email}
              />
              <FormInput
                type="password"
                label="Mot de passe"
                required
                onChange={handleChange}
                name="password"
                value={password}
              />
              <FormInput
                type="password"
                label="Confirmez votre mot de passe"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              />
             
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {loading ? (
              <button className="disabled-btn"><Loader animation={'sacade'}/></button>
            ) : (
              <button type="submit">S'inscrire</button>
            )}
          </form>
          )
          }
        </div>
    </Fragment>
  );
};
export default SignUpForm;