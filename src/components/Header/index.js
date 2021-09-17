
import './header.css';
import avatar from '../../assets/avatar.png';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';

export default function Header(){

    const {user} = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='imagem logo'/>
            </div>

            <Link to='/dashboard'> <FiHome color='#fff' size={24} />Chamados</Link>
            <Link to='/clients'><FiUser color='#fff' size={24} />Clientes</Link>
            <Link to='/profile'><FiSettings color='#fff' size={24} />Configurações</Link>
        </div>
    )
}