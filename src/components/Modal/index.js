
import { FiX } from 'react-icons/fi';
import './modal.css';

export default function Modal({conteudo, close}){
    return(
        <div className='modal'>
            <div className='container-modal'>
                <button className='close-btn' onClick={ close } >
                    <FiX size={23} color='#fff' />
                    Sair
                </button>

            <h2>Detalhes do Chamado</h2>
            <div className='row'>
                <span>
                    Cliente: <a> {conteudo.cliente} </a>
                </span>
            </div>
            
            <div className='row'>
                <span>
                    Assunto: <a> {conteudo.assunto} </a>
                </span>
                <span>
                    Cadastrado em: <a> {conteudo.createdFormated} </a>
                </span>
            </div>
            
            <div className='row'>
                <span>
                    Status: <a style={{color: '#fff', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : "#999"}}> 
                    {conteudo.status} </a>
                </span>
            </div>

            {conteudo.complemento !== '' && (
                
                <>
                    <h3>Complemento:</h3>
                    <p> {conteudo.complemento} </p>
                </>
            )}            
        </div>
    </div>
    )
}