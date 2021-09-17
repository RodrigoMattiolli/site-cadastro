
import { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [user, setUser] = useState (null);
    const [authLoading, setAuthLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    },[]);

    async function signIn(email, password){
        setAuthLoading(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users').doc(uid).get();

            let data = ({
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            })

            setUser(data);
            storageUsers(data);
            setAuthLoading(false);
            toast.success('Bem vindo de volta');

        })
        .catch((err)=>{
            console.log(err);
            setAuthLoading(false);
            toast.error('Login inválido, tente novamente');
        })

    }

    async function signUp(nome, email, password){
        setAuthLoading(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            await firebase.firestore().collection('users').doc(uid)
            .set({
                nome: nome,
                avatarUrl: null

            }).then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data);
                storageUsers(data);
                setAuthLoading(false);
                toast.success('Bem vindo(a) ao sistema!');

            }).catch((err)=>{
                console.log(err);
                setAuthLoading(false);
                toast.error('Algo deu errado!');
            })
        })
    }

    function storageUsers(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signUp
                                     , signOut, signIn, authLoading, setUser, storageUsers }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;