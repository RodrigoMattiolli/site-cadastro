
import { useState, useEffect, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import './new.css';

import { AuthContext } from '../../contexts/Auth';
import { toast } from 'react-toastify';

export default function New(){

    const[assunto, setAssunto] = useState('Suporte');
    const[status, setStatus] = useState('');
    const[complemento, setComplemento] = useState('');

    const[clientes, setClientes] = useState([]);
    const[loadListaClientes, setLoadListaClientes] = useState(true);
    const[clienteSelect, setClienteSelect] = useState(0);

    const {user} = useContext(AuthContext);

    useEffect(()=>{

        async function loadClientes(){
            await firebase.firestore().collection('clients').get()
            .then((snap) => {
                let lista = []

                snap.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        NomeFantasia: doc.data().NomeFantasia
                    });
                })

                if(lista.length === 0){
                    console.log('nenhuma empresa encontrada');
                    setClientes([{id:1, NomeFantasia:''}]);
                    setLoadListaClientes(false);
                    return;
                }

                setClientes(lista);
                setLoadListaClientes(false);

            })
            .catch((err) => {
                console.log(err);
                setLoadListaClientes(false);
                setClientes([{id:1, NomeFantasia:''}])
            })
        }

        loadClientes();
    }, [])


    async function handleRegister(e){
        e.preventDefault();

        await firebase.firestore().collection('calls').add({
            data: new Date(),
            client: clientes[clienteSelect].NomeFantasia,
            idClient: clientes[clienteSelect].id,
            status: status,
            subject: assunto,
            addicionalInfo: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success('Chamado registrado com sucesso!');
            setClienteSelect(0);
            setComplemento('');
        }).catch((err) =>{
            toast.error(err);
        })
    }

    return(
        <div>
        <Header/>
        
        <div className='content'>
            <Title name='Novo Chamado'>
                <FiPlus size={25} />
            </Title>

        <div className='container-profile'>
            <form className='form-profile' onSubmit={ handleRegister }>
                
                <label>Cliente</label>

                {loadListaClientes ? (
                    <input type='text' disabled={true} value='Carregando Clientes...' />
                ) : (

                    <select value={clienteSelect} onChange={ (e) => setClienteSelect(e.target.value) }>
                        {clientes.map((item, index) => {
                            return(
                                <option key={item.id} value={index}> {item.NomeFantasia} </option>
                            )
                        })}
                    </select>
                ) }


                <label>Assunto</label>
                <select value={assunto} onChange={(e)=> setAssunto(e.target.value)}>
                    <option value='Suporte'>Suporte</option>
                    <option value='Visita'>Visita Técnica</option>
                    <option value='Financeiro'>Financeiro</option>
                </select>

                <label>Status</label>
                <div className='radio-status'>

                    <input type='radio' name='radio' value='Aberto' onChange={(e)=> setStatus(e.target.value)} checked={status === 'Aberto'} />
                    <span>Em Aberto</span>

                    <input type='radio' name='radio' value='Progresso' onChange={(e)=> setStatus(e.target.value)} checked={status === 'Progresso'} />
                    <span>Em Progresso</span>

                    <input type='radio' name='radio' value='Finalizado' onChange={(e)=> setStatus(e.target.value)} checked={status === 'Finalizado'} />
                    <span>Finalizado</span>
                </div>

                <label>Detalhes</label>
                <textarea type='text' placeholder='Descreva os detalhes da ordem de serviço (opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)} />

                <button type='submit'>Salvar</button>
            </form>
        </div>

        </div>
    </div>
    
    )
}