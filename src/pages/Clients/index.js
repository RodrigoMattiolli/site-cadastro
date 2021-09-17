
import { useState } from "react";

import { FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from "../../services/firebaseConnection";

export default function Clients(){

    const [cliente, setCliente] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleClients(e){
        e.preventDefault();

        if(cliente !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('clients')
            .add({
                NomeFantasia: cliente,
                CNPJ: cnpj,
                Endereco: endereco
            })
            .then(()=>{
                setCliente('');
                setCnpj('');
                setEndereco('');
                toast.success("Cliente cadastrado com sucesso!");
            })
            .catch(toast.error('Algo deu errado, tente novamente!'))
        }
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name='Clientes'>
                    <FiUsers size={25} />
                </Title>

            <div className='container-profile'>
                <form className='form-profile' onSubmit={ handleClients }>

                    <label>Nome do Cliente</label>
                    <input type='text' placeholder='Nome fantasia' value={cliente} onChange={(e)=>setCliente(e.target.value)}/>

                    <label>CNPJ</label>
                    <input type='text' placeholder='seu CNPJ' value={cnpj} onChange={(e)=>setCnpj(e.target.value)} />

                    <label>Endereço</label>
                    <input type='text' placeholder='rua, nº, bairro, cidade' value={endereco} onChange={(e)=>setEndereco(e.target.value)} />

                    <button type='submit' >Salvar</button>
                </form>

            </div>
            
            </div>
        </div>
    )
}