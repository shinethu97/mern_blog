import React ,{useContext} from "react";
import AuthContext from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";


const RouteNoAuth =(props)=>{

    const { authUser} = useContext(AuthContext);

    if(!authUser){
        return <Navigate to={'/login'}/>
    }
    return <div>{props.children}</div>
}
export default RouteNoAuth;