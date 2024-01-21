import React, { useContext, useState } from 'react'
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const[btnNameReact,setBtnNameReact]=useState("Login");
  
  const status=useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);
  const cartItems = useSelector((state)=>state.cart.items);//subscribing to the store
  // console.log(cartItems);
  
  return (
    
      
  
    <div className="flex  justify-between bg-pink-100 shadow-lg">
     <div className='logo-container'>
      <img className="w-56" src={LOGO_URL}/>
      </div>
      <div className='flex items-center'>
        <ul className='flex p-4 m-4'>
          <li className='px-4'>{status?"🟢":"🔴"}</li>
          <li className='px-4'> <Link to="/">Home</Link></li>
          <li className='px-4'> <Link to="/about">About Us</Link></li>
          <li className='px-4'> <Link to="/contact">Contact Us</Link></li>
         
          
          <li className='px-4 font-bold text-xl'><Link to="/cart">Cart - ({cartItems.length}</Link> items)</li>
          <button className='login'>{btnNameReact}</button>
          <li className='px-4 font-bold'>{loggedInUser}</li>


        </ul>
        </div>


    </div>
  );
}

  


export default Header
