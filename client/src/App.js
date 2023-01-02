import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './mycomponent/Home';
import Dashboard from './mycomponent/Dashboard';
import Pagenot from './mycomponent/Pagenot';
import Navbar from './mycomponent/Navbar';
import Contact from './mycomponent/Contact';
import Face from './mycomponent/Face';
import About from './mycomponent/About';
import Login from './mycomponent/Login';
import Register from './mycomponent/Register';
import { SpeechProvider } from "@speechly/react-client";
import { themeContext } from './Context';
import { useContext } from 'react';


function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
      <div className='app'
        style={{
          background: darkMode ? "black" : '',
          color: darkMode ? "white" : '',
        }}>
        <SpeechProvider appId="3c4caa52-929e-4a80-94f2-8740ec8bdb32">
          <Navbar/>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route exact path='/' element={<ProtectedRoute> <Home /></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
            <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path='/face' element={<ProtectedRoute><Face /></ProtectedRoute>} />
            <Route path='/about' element={<ProtectedRoute> <About /></ProtectedRoute>} />
            <Route element={Pagenot} />
          </Routes>
        </SpeechProvider>
      </div>
    </>
  );
}

export function ProtectedRoute(props) {
  const navigate = useNavigate();
  const storage = localStorage.getItem("Hisabbook-user");
    useEffect(() => {
      if (!storage) {
        navigate("/login");
      }
    }, []);
  return (
    props.children
  )
}

export default App;
