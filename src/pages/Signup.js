import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './login.css'
import { useState } from 'react';
import Signupmodal from '../modal/signupmodal';
import LoginModal from '../modal/loginmodal';

export default function Signup() {
      
    let [email, setemail]=useState("");
    let [password, setpassword]=useState("");
    let [cpassword, setcpassword]=useState("");
    let [error, seterror] = useState("");

    const navigate =useNavigate();

    const createUser = async () => {
            if (password == cpassword){
                await createUserWithEmailAndPassword(getAuth(), email, password);
                navigate('/');
            }else{
                seterror("Password Does Not Match")
            }
    }

  return (
    <div><section className="">
    <div className="">
        <div className=" rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                {error && <p className="error">{error}</p>}
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" value={email}
                        onChange={e=>setemail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" value={password}
                        onChange={e=>setpassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label for="confirm-password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" value={cpassword}
                        onChange={e=>setcpassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                   
                    <button onClick={createUser} className="w-full text-white
                             border-2 border-white  h-10 rounded-sm">Sign Up</button>
                    
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <button className="font-medium text-primary-600 hover:underline dark:text-primary-500"><LoginModal/></button>
                    </p>
                    
                    
                </form>
            </div>
        </div>
    </div>
  </section></div>
  )
}
