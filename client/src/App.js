import React, {createContext, useReducer} from 'react';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Logout from './components/Logout';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {initialState, reducer} from '../src/reducer/useReducer';

export const userContext = createContext();
const Routing = () => {
  return(
    <Routes>
          <Route exact path = '/' element = {<Home/>}></Route>

          <Route path = '/about' element = {<About/>}></Route>

          <Route path = '/contact' element = {<Contact/>}></Route>

          <Route path = '/signin' element = {<Signin/>}></Route>

          <Route path = '/register' element = {<Register/>}></Route>

          <Route path ='/logout' element = {<Logout/>}></Route>

          <Route path = '*' element = {<ErrorPage/>}></Route>
  </Routes>
  )
}

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>
      <userContext.Provider value = {{state, dispatch}}>
        <Navbar/>
        <Routing/>
      </userContext.Provider>  
    </>
  )
}

export default App;
