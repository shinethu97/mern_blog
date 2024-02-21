import React, {useContext, useState} from "react";
import MasterLayout from "./Layout/MasterLayout";
import { toast } from "react-toastify";
import axios from "axios";
import BtnLoader from "../Components/btnLoader";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Cookies from 'js-cookie';
//


const LoginPage = ()=>{
    const {setAuthUser} = useContext(AuthContext);
    const navigate= useNavigate();
    const login=()=>{
        setLoader(true);
        axios.post('/login', {email,password}, {withCredentials: true})
        .then((response)=>{
            //console.log(response.headers)
            setLoader(false)
            Cookies.set('token', response.data.result.token , { expires: 7, secure: true });
            toast.success(`Hello ${response.data.result.name}`)  
            setAuthUser({id:response.data.result.id, name:response.data.result.name}) 
            navigate('/');
        })
        .catch((err)=>{
            setLoader(false)
            toast.error(err.response.data.msg)
        })
    } 

    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
        return (
            <MasterLayout>
                <div className="bg-card p-4 rounded">
                <h5 className="text-white">Login</h5>
                <div className="form-group">
                    <label htmlFor="">Enter Email</label>
                    <input type="text" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Enter Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <button disabled={loader} className=" btn btn-primary mt-2 mr-2" onClick={login}>
                  {loader &&  <BtnLoader/>}
                    Login</button>
                </div>
            </MasterLayout>
         )
}
export default LoginPage;