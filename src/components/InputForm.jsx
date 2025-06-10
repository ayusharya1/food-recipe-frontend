import React, { useState } from 'react'
import axios from "axios"

function InputForm({setisOpen}) {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isSignUp,setIsSignUp]=useState(false)
    const [error,setError]=useState("")
    console.log(error);
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        let endPoint=(isSignUp)?"signUp":"login"
        await axios.post(`http://localhost:8080/${endPoint}`,{email,password}).then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setisOpen()
        }).catch(err=>setError(err.response?.data?.error ))
    }
  return (
    <>
    <form className='form' action="" onSubmit={handleSubmit}>
        <div className="form-control">
            <label>Email</label>
            <input type="email" className="input" onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="form-control">
            <label>Password</label>
            <input type="password" className="input" onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button type='submit'>{(isSignUp)?"Sign Up":"Login"}</button><br />
        {(error!="")&& <h6 className='error'>{error}</h6>}
        <p onClick={()=>setIsSignUp(prev=>!prev)}>{(isSignUp)?"Already have an account" :"Create new account"}</p>
    </form>
    </>
  )
}

export default InputForm