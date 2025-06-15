"use client"
import axios from 'axios';
import { AppContext, useAppContext } from '../../context/AppContext';
import React from 'react';
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
const Login = () => {
        const [currentState ,setCurrentState] = useState('Log In')
        const {token,setToken,router} = useAppContext()
        const [name,setName] = useState('')
        const [password,setPassword] = useState('')
        const [email,setEmail] = useState('')
        



    const onSubmitHandler = async (event) =>{
        event.preventDefault()

         try{
            if(currentState === 'Sign Up'){
                const response = await  axios.post('/api/auth/register',{name,email,password})
                if(response.data.success){
                    console.log(response.data)
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token) //saving data in local storage
                    toast.success(response.data.success)
 
                }
                else{
                  toast.error(response.data.message)
                }
            }
            else{
                const response = await  axios.post('/api/auth/login',{email,password})
             
                if(response.data.success){
                    toast.success(response.data.message)
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token) //saving data in local storage
                }
                else{
                     toast.error(response.data.message)
                }
            }
        }catch(err){
            console.log(err)
        }
           
    }


    useEffect(() =>{
        if(token){
            router.push('/')

        }
    },[token])
    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {currentState==='Log In' ? '' : <input value={name} onChange={(e) =>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-800" type="text" placeholder="Name " required/>}
            <input onChange={(e) =>setEmail(e.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800" type="email" placeholder="Email " required/>
            <input onChange={(e) =>setPassword(e.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800" type="password" placeholder="Password "required />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forgot your password</p>
                {currentState==='Log In'? <p onClick={() =>setCurrentState('Sign Up')} className="cursor-pointer">Create an account</p> : <p onClick={() =>setCurrentState('Log In')}className="cursor-pointer">Login here</p>}
            </div>

            <button className="bg-black w-full text-white font-light px-8 py-2 mt-4">{currentState=== 'Log In' ? 'Log In': 'Sign Up'} </button>
    
        </form>
    );
};


export default Login;