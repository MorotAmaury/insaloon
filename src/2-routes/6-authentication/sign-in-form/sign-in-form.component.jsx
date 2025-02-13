import './sign-in-form.styles.scss';
import './sign-in-form.responsive.scss'
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../3-context/0-user.context';

import {
  resetPassword,
  signInAuthUserWithEmailAndPassword,
} from '../../../4-utils/firebase.utils';

import FormInput from "../../../1-components/2-form-input/form-input.component";

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate()

  const { setCurrentUser, setEmail} = useContext(UserContext);
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
      setCurrentUser(user);
      setEmail(email)

      navigate('/analyse')

    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          alert("L'adresse mail et le mot de passe ne correspondent pas")
          setFormFields({...formFields, password:''})
          break
        case 'auth/wrong-password':
          alert('Mot de passe erroné pour cet e-mail');
          break;
        case 'auth/user-not-found':
          alert('Aucun utilisateur avec cet e-mail');
          break;
        case 'auth/too-many-requests':
          alert("Le compte a été temporairement desactivé à causes d'un trop grand nombre de tentatives infructueuses. Veuillez réinitialiser votre mot de passe ou réessayer ultérieurement.")
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleReset =  async () => {
    if (email === "")
    {
      alert('Aucune adresse e-mail renseignée')
    }
    else
    {
      if(window.confirm(`Envoyer un message de réinitialisation à cette adresse: ${email}`) )
      {
        resetPassword(email)
      }
    }
  }
  return (
    <div className="sign-in-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="double">
        <FormInput
            type="email"
            label="Email"
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
        </div>
        <button type="submit">Se connecter</button>
        <p className='resetMdp'> Mot de passe oublié ? 
          <span onClick={handleReset}>Le réinitialiser</span>
        </p>
      </form>
    </div>
  );
}
export default SignInForm;