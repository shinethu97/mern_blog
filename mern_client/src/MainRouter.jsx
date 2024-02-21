import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Hompage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"
import LoginPage from "./Pages/Login"
import {ToastContainer} from 'react-toastify'
import { AuthContextProvider } from "./Context/AuthContext"
import Profilepage from "./Pages/Profilepage"
import RouteNoAuth from "./Pages/RouteMiddle/RedirectNoAuth"


function MainRouter() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
    <Routes>
         <Route path="/" element={<Hompage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/profile" element={
         <RouteNoAuth>
          <Profilepage/>
         </RouteNoAuth>
         }/>
      </Routes>
      <ToastContainer />
    </AuthContextProvider>
    </BrowserRouter>
  )
}

export default MainRouter
