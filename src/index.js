import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/about';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Login from './pages/Login';
import Signup from './components/Signup';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDR1hf3Bvoaj7xjN1JJYUYtmHbiGgNWLs8",
  authDomain: "test-react-5851e.firebaseapp.com",
  projectId: "test-react-5851e",
  storageBucket: "test-react-5851e.appspot.com",
  messagingSenderId: "1036096408833",
  appId: "1:1036096408833:web:e08724aaa455103b41df00",
  measurementId: "G-WWMBL8H8T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // For Authentication
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<App />} />
      <Route path = "/about" element={<About />} />
      <Route path = "/login" element={<Login />} />
      <Route path = "/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

