import { Link, useNavigate } from "react-router-dom"
import './login.css'
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../index'
import Signupmodal from "../modal/signupmodal";
import App from "../App";
import AlertFunction from "../components/Alert";

export default function Login({setAlert}) {
    console.log(typeof(setAlert))
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");
    let [error, seterror] = useState("");


    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/');
        } catch (e) {
            setAlert({
                open: true,
                message:`${e.message}`,
                type: "error",
                time:5000,
            })
            // seterror(e.message);
        }
    }



   const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
          .then((res) => {
            navigate('/');
         
            console.log(`Sign Up Successful. Welcome ${res.user.email}`);
          })
          .catch((error) => {
            console.log(error);
            return;
          });
          
      };
    return (
        <div>
            <div >
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                        {error && <p className="error">{error}</p>}
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" value={email}
                                    onChange={e => setemail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button onClick={logIn} className="w-full text-white
                             border-2 border-white  h-10 rounded-sm">Sign in</button>
                            <p className=" text-white">OR</p>
                           
                            <GoogleButton  onClick={signInWithGoogle} style={{ width: "100%", outline: "none" }}/>
                            
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                
                                    <button className="font-medium text-yellow-500 "><Signupmodal/></button>
                                
                            </p>
                        </form>
                    </div>
                </div>
            </div>
       </div>

    )
}
