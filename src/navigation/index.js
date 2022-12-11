import React from 'react'
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from '../page/Home';
import Fixtures from '../components/Fixtures';

function Navigation() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/:id/fixtures' element={<Fixtures/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Navigation;
