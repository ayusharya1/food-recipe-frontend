import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen,setisOpen]=useState(false)
  let token=localStorage.getItem("token")
  let user=JSON.parse(localStorage.getItem("user"))
  // console.log(token);
  const [isLogin,setIsLogin]=useState(token ? false : true)
  console.log(isLogin);
  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])
  const checkLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }else{
      setisOpen(true)
    }
    
  }
  return (
    <>
    <header>
        <h2>Food Blog</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={()=>isLogin && setisOpen(true)}><NavLink to={!isLogin?"/myRecipe":"/"}>My Recipe</NavLink></li>
            <li onClick={()=>isLogin && setisOpen(true)}><NavLink to={!isLogin?"/favRecipe":"/"}>Favourites</NavLink></li>
            
            <li onClick={checkLogin}><p className='login'>{isLogin ?"Login":"Logout"} {user?.email? `(${user.email})`:""}</p></li>
        </ul>
    </header>
    {isOpen && <Modal onClose={()=>setisOpen(false)}><InputForm setisOpen={()=>setisOpen(false)}></InputForm></Modal>}
    </>
  )
}

export default Navbar