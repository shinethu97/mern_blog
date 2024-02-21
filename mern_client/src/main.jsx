import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRouter from './MainRouter.jsx'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.baseURL="http://127.0.0.1:3000/api";
axios.defaults.withCredentials= true;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)
