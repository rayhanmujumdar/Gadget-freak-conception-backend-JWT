import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase/firebase.init';

const MyOrder = () => {
    const [myOrder,setMyOrder] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() =>{
        const url = `http://localhost:5000/order?email=${user?.email}`
        axios.get(url,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.success === 'UnAuthorized Access'){
                toast.error('UnAuthorized Access')
            }else{
                setMyOrder(res.data)
            }
        })
    },[user])
    return (
        <div className='min-vh-100 '>
            <h1 className='fw-normal text-center my-2 mb-5'>This is My order</h1>
            <div className='row'>
                {
                    myOrder.map(order => <div className="col-lg-4 col-md-6">
                    <div className="card bg-dark m-1 text-white">
                      <div className="card-body">
                        <h5 className="card-title">{order?.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">This is our product</h6>
                        <p className='m-0'>Price: {order?.price}</p>
                        <p className='m-0'>Order: {order?.email}</p>
                        <p className='m-0'>address: {order?.address}</p>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default MyOrder;