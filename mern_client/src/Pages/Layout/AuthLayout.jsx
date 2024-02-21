import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const AuthLayout = ()=>{
    const navigate= useNavigate();
    const logout = ()=>{
            Cookies.set('token','');
            setAuthUser(false);
            navigate('/login')
    }
    useEffect(()=>{
        const token=Cookies.get('token')
        axios.post('/checkFront', {token}).then(({data})=>{
            setAuthUser({id: data.result.id, name: data.result.name})
            console.log(data)
        }).catch((err)=>{
            setAuthUser(false)
            console.log(err.response.data.msg)
        })
    },[])
    const {authUser, setAuthUser} = useContext(AuthContext)
    return(
        <div className="bg-card p-3">
            {
                !authUser && (
                    <>
                        <Link to="/login" className="btn btn-primary">
                        Login
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                        Register
                        </Link>
                    </>
                )
            }
            {
                authUser && (
                    <>
                    <Link to="/profile" className="btn btn-primary">
                        Profile {`(${authUser.name})`}
                        </Link>
                        <button onClick={logout} className="btn btn-primary">
                        Logout
                        </button>
                    </>
                )
            }
        </div>


    )
}
export default AuthLayout