import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='fs-1 text-center mt-3'>404</h1>
            <p className='text-center'>Page Not Found</p>
            <button onClick={() => navigate('/')} className='btn btn-primary d-block mx-auto'>Go to home</button>
        </div>
    );
};

export default NotFound;