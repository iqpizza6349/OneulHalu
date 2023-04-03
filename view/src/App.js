import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import Diary from './components/diary/Diary';
import Calendar from './components/calendar/Calendar';
import Auth from './components/auth/Auth';
import Login from './components/auth/view/Login';
import Register from './components/auth/view/Register';
import PrivateRoute from './components/security/PrivateRoute';

import './App.css';

const App = () => {
    const token = sessionStorage.getItem("Authorization");

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<PrivateRoute component={<Calendar/>} authenticated={token}/>}/>
            <Route path={"/login"} element={<Auth component={<Login/>}/>}/>
            <Route path={"/register"} element={<Auth component={<Register/>}/>}/>
            <Route path={"/diary"} element={<PrivateRoute component={<Diary/>} authenticated={token}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
};

export default App;