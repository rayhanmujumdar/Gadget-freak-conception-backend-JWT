import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../../firebase/firebase.init'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
const UploadPd = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Submit your data into Redux store
  const onSubmit = (data) => {
      axios.post('http://localhost:5000/product',data,{
          headers: {
            authorization: `${user.email} ${localStorage.getItem('accessToken')}`
          }
      })
      .then(response => {
          switch (response.data.success){
            case 'Product Upload Successfully':
                toast.success('Product Upload Successfully')
                break
                default:
                toast.error('UnAuthorized Access')
                break
          }
          if(response.data.success === 'UnAuthorized Access'){
              signOut(auth)
              navigate('/login')
          }
      })
  };
  return (
    <div className="min-vh-100 my-5 container-sm">
      <form className="d-flex flex-column w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-3 py-2" {...register("name",{ required: true })} placeholder='Product name'/>
        {errors.name && <p className="text-danger">Name is require</p>}
        <input className="mb-3 py-2" {...register("price",{ required: true })} placeholder='Product Price'/>
        {errors.price && <p className="text-danger">Please enter number for Price</p>}
        <textarea {...register("text", { required: true })} placeholder='Description' style={{"resize": 'none',"height": '150px'}}/>
        {errors.text && <p className="text-danger">Description require</p>}
        <input className="btn btn-success my-3" type="submit" />
      </form>
    </div>
  );
};

export default UploadPd;
