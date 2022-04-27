import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase/firebase.init';

const PrivateAuth = ({children}) => {
    const [user,loading,error] = useAuthState(auth)
    let location = useLocation()
    if(loading){
        return <div className='text-center'>loading....</div>
    }
    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivateAuth;