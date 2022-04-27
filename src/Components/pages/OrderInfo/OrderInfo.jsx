import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const OrderInfo = () => {
    const [user] = useAuthState(auth)
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:5000/productId/" + orderId).then((response) => {
      setOrder(response.data);
    });
  }, [orderId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
        const {name,price,...rest} = data
        const orderData = {name: order.name,price: order.price,email: user.email,...rest}
        axios.post('http://localhost:5000/order',orderData,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            console.log(res.data.success)
            switch(res.data.success){
                case 'Successfully send order':
                    toast.success("Product Upload Successfully")
                    break
                    default:
                    toast.error("UnAuthorized Access")
                    signOut(auth)
                    navigate('/login')
            }
        })
  };
  return (
    <div className="min-vh-100">
      <form className="d-flex flex-column w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-3 py-2" defaultValue={order?.name} {...register("name")} placeholder='Product name' readOnly disabled/>
        <input className="mb-3 py-2" defaultValue={user?.email} {...register("price")} placeholder='Product Price' readOnly disabled/>
        <input className="mb-3 py-2" defaultValue={order?.price} {...register("price")} placeholder='Product Price' readOnly disabled/>
        <input className="mb-3 py-2" {...register("address",{ required: true })} placeholder='Address'/>
        {errors.address && <p className="text-danger">Please enter your address</p>}
        <input className="mb-3 py-2" {...register("phone",{ required: true })} placeholder='Phone Number'/>
        {errors.phone && <p className="text-danger">Please enter your phone number</p>}
        {errors.text && <p className="text-danger">Description require</p>}
        <input className="btn btn-success my-3" type="submit" />
      </form>
    </div>
  );
};

export default OrderInfo;
