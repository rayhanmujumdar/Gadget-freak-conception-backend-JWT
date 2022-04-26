import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase/firebase.init';

const Header = () => {
    const  [user, loading, error] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to=""  className="navbar-brand fs-2 fw-bold text-primary" href="#">Gadget Freak</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home"  className="nav-link active fs-5" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/product"  className="nav-link active fs-5" aria-current="page" href="#">product</Link>
              </li>
              <li className="nav-item">
                <Link to="/updatepd"  className="nav-link active fs-5" aria-current="page" href="#">Update Product</Link>
              </li>
            </ul>
            {user ? <button className='btn btn-danger' onClick={handleSignOut}>SignUp</button> :
                <Link to="/login"  className="nav-link active fs-5 btn btn-danger d-inline-block" aria-current="page" href="#">Login</Link>
            }
          </div>
        </div>
      </nav>
        </div>
    );
};

export default Header;