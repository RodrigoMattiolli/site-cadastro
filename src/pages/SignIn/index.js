
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth';
import './signin.css';
import logo from '../../assets/logo.png';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, authLoading } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      signIn(email, password);
    }

  }

    return (
     <div className='container'>
       <div className='login'>
         <div className='logo-area'>
            <img src={logo} alt='logo-entrada'/> 
         </div>

         <form onSubmit={ handleSubmit }>
           <h1>Entrar</h1>

           <input type='text' placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type='submit'> {authLoading ? 'Carregando...' : 'Acessar'} </button>
         </form>

         <Link to='/register' >Criar nova conta</Link>
       </div>
     </div>
    );
  }
  
  export default SignIn;
  