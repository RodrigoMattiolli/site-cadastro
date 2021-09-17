
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Title from "../../components/Title";
import Modal from "../../components/Modal";

import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import firebase from "../../services/firebaseConnection";

import './dashboard.css';
import { format } from "date-fns";

const listRef = firebase.firestore().collection('calls').orderBy('data', 'desc')

export default function Dashboard(){

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const[showPostModal, setShowPostModal] = useState(false);
    const[detail, setDetail] = useState();

    useEffect(()=>{

        async function loadCalls(){
            await listRef.limit(5).get()
            .then((snap) => {
                updateState(snap);
            })
            .catch((err)=> {
                console.log(err); 
                
                setLoadMore(false)
            })
            
            setLoading(false);
        }

        loadCalls();
        return() => {}
    }, [])

    
    async function updateState(snap){
        const isCollectionEmpty = snap.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snap.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().subject,
                    cliente: doc.data().client,
                    clienteId: doc.data().idClient,
                    created: doc.data().data,
                    createdFormated: format(doc.data().data.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().addicionalInfo
                })
            });

                const lastDoc = snap.docs[snap.docs.length - 1];

                setChamados(chamados => [...chamados, ...lista]);
                setLastDocs(lastDoc);
        }
        else{
            setIsEmpty(true);
        }

        setLoadMore(false);

    }

    async function handleMore(){
        setLoadMore(true);

        await listRef.startAfter(lastDocs).limit(5).get()
        .then((snapshot) =>{
            updateState(snapshot);
        })
    }

    function togglePostModal(item){
        console.log(item);
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if(loading){
        return(
            <div>
                <Header/>
                
                <div className='content'>
                    <Title name='Meus Chamados'>
                        <FiMessageSquare size={25} />
                    </Title>
                </div>

                <div className='container-profile dashboard'>
                    <span>Carregando chamados...</span>
                </div>
            </div>
        )
    }

    return(
        <div>
        <Header/>
        
        <div className='content'>
            <Title name='Meus Chamados'>
                <FiMessageSquare size={25} />
            </Title>
            
            {chamados.length === 0 ? (

                <div className="container-profile dashboard">
                    <span>Nenhum chamado cadastrado...</span>
                    <Link to='/new' className='new-call'>
                        <FiPlus color='#fff' size={25} />
                        Novo Chamado
                    </Link>

                </div>
            ) : (
                <>
                    <Link to='/new' className='new-call'>
                        <FiPlus color='#fff' size={25} />
                        Novo Chamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Assunto</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Cadastrado em:</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>

                        <tbody>
                            {chamados.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td data-label='Cliente'>{item.cliente}</td>
                                        <td data-label='Assunto'>{item.assunto}</td>
                                        <td data-label='Status'>
                                            <span className='badge' style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                        </td>
                                        <td data-label='Cadastrado'>{item.createdFormated}</td>
                                        <td data-label='#'>
                                            <button className='action' style={{backgroundColor:'#3583f6'}} onClick={ ()=> togglePostModal(item) }>
                                                <FiSearch color='#fff' size={18} />
                                            </button>
                                            <button className='action' style={{backgroundColor:'#f6a935'}}>
                                                <FiEdit2 color='#fff' size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {loadMore && <h3 style={{textAlign:'center', marginTop: 15}}>Buscando dados...</h3>}
                    {!loadMore && !isEmpty && <button className='btn-more' onClick={ handleMore }>Buscar mais</button>}

                </>
            )}
        
        </div>

        {showPostModal && (
            <Modal 
                conteudo ={detail}
                close ={togglePostModal}
            />
        )}
    </div>
    )
}