import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login(props) {
    const navigate=useNavigate()
    const [details,setdetails]=useState({email:"", password:""})
    const onchange=(e)=>{
          setdetails({...details,[e.target.name]:e.target.value})
    }
    const handleclick=async(e)=>{
         e.preventDefault()
         const res=await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({email:details.email,password:details.password})
         })
         const note =await res.json();
        if(note.flag===true)
        {
            props.showalert('Login Successful','success')
            localStorage.setItem('token',note.authToken)
            localStorage.setItem('Current',details.email)
            navigate('/')
        }
        else
        props.showalert('Invalid Credentials','danger')
    }
    return (
        <>
          <h1 className="" style={{marginTop:"5.5vh"}}>Login</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={onchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onchange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success my-3 mx-1" onClick={handleclick}
            >
              Login
            </button>
          </form>
        </>
      );
}

export default Login
