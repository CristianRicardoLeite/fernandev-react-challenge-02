import { login } from './utils';
import './index.css';
import { useEffect, useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleEmailChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);
    disableLogin(newEmail, password);
  }

  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    disableLogin(email, newPassword);
  }

  function disableLogin(newEmail, newPassword) {
    if (newEmail === '' || newPassword.length < 6) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }

  async function handleLoginClick() {
    if (isButtonDisabled || isLoggingIn) {
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await login(password, email);
      alert(response.message); // Exibe mensagem de sucesso
      setErrorMessage('');
    } catch (error) {
      alert(error.message); // Exibe mensagem de erro
      setErrorMessage('Seu login ou sua senha estão incorretos, verifique e tente novamente.');
    }

    setIsLoggingIn(false);
  }



  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {errorText && <div className='errorMessage'>{errorMessage}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id='email' type='email' value={email} onChange={handleEmailChange} autoComplete='off' />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id='password' type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className='button'>
          <button type='submit' onClick={handleLoginClick} disabled={isButtonDisabled || isLoggingIn}>Login</button>
        </div>
      </div>
    </div>
  );
}
