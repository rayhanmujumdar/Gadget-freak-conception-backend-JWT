import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/pages/Home/Home';
import Login from './Components/pages/Login/Login';
import NotFound from './Components/pages/NotFound/NotFound';
import Product from './Components/pages/Products/Products';
import UpdatePd from './Components/pages/UpdatePd/UpdatePd';
import PrivateAuth from './Components/PrivateAuth/PrivateAuth';
import Footer from './Components/Shared/Footer/Footer';
import Header from './Components/Shared/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderInfo from './Components/pages/OrderInfo/OrderInfo';
import MyOrder from './Components/pages/MyOrder/MyOrder';
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='product' element={
          <PrivateAuth>
            <Product></Product>
          </PrivateAuth>
        }></Route>
        <Route path='myorders' element={
          <PrivateAuth>
            <MyOrder></MyOrder>
          </PrivateAuth>
        }></Route>
        <Route path='uploadpd' element={
          <PrivateAuth>
            <UpdatePd></UpdatePd>
          </PrivateAuth>
        }></Route>
        <Route path='/order-info/:orderId' element={
          <PrivateAuth>
            <OrderInfo></OrderInfo>
          </PrivateAuth>
        }></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
