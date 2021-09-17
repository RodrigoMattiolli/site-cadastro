
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';

import logo from '../../assets/logo.png';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const { signUp, authLoading } = useContext(AuthContext);


  function handleSubmit(e){
    e.preventDefault();

    if(nome !== '' && email !== '' && password !== ''){
      signUp(nome, email, password);
    }
  }

    return (
     <div className='container'>
       <div className='login'>
         <div className='logo-area'>
            <img src={logo} alt='logo-entrada'/> 
         </div>

         <form onSubmit={handleSubmit}>
           <h1>Fazer novo Cadastro</h1>

           <input type="text" placeholder='Nome Completo' value={nome} onChange={(e)=> setNome(e.target.value)} />
           <input type='text' placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
           <input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type='submit'> {authLoading ? 'Carregando...' : 'Cadastrar'} </button>
         </form>

         <Link to='/' >Fazer Login</Link>
       </div>
     </div>
    );
  }
  
  export default SignUp;
  