import React, {useContext, useState} from "react";
import MasterLayout from "./Layout/MasterLayout";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import BtnLoader from "../Components/btnLoader";
import { useNavigate } from "react-router-dom";

const RegisterPage = ()=>{
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [name, setName] = useState('');
     const [loader, setLoader]= useState(false);

     const navigate = useNavigate();
     const {setAuthUser}= useContext(AuthContext);
     const register = ()=>{
        axios.post('/register', {email, password, name})
        .then(({data})=>{
            setLoader(true)
            toast.success( `Hello ${data.result.name}`)
            Cookies.set('token', data.result.token , { expires: 7, secure: true });
            setAuthUser({id:data.result.id, name:data.result.name})
            navigate('/')
        }).catch((err)=>{
            setLoader(true)
            toast.error(err.response.data.msg)
        })
     }
        return (
            <MasterLayout>
                <div className="bg-card p-4 rounded">
                <h5 className="text-white">Register</h5>
                <div className="form-group">
                    <label htmlFor="">Enter Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Enter Email</label>
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Enter Password</label>
                    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className=" btn btn-primary mt-2" onClick={register}>
                    {loader && <BtnLoader/>}Register
                    </button>
                </div>
            </MasterLayout>
         )
}
export default RegisterPage;