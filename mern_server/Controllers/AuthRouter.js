import userDB from '../Models/user.js';
import {fMsg} from '../Utils/helper.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

var salt = bcrypt.genSaltSync(10);
export const login = async (req, res, next) =>{
    const { email, password} =  req.body;
    const user = await userDB.findOne({email});
    if(!user){
        next(new Error("Your Email does not exist"));
        return
    }
    const ispassword = bcrypt.compareSync(password, user.password);
    if(!ispassword){
        next(new Error("Incorect password"))
        return;
    }
    const token = jwt.sign({id:user._id,name:user.name},process.env.SECRET);
    res.cookie("token", token);
    res.cookie('access-token', token).json({
        con:true,
        message:"Login Success",
        result:{id:user._id,name: user.name, token:token}
    })
    
   // fMsg(res, "Login Success", {id:user._id,name: user.name, token:token});
}



export const register = async (req, res, next) =>{
        try{
            const {name, password, email} = req.body;
            const emaildb= await userDB.findOne({email:email});
            console.log(emaildb)
            if(emaildb){
                 next(new Error("Email is already exist"))
                 return
            }
            const hashPass= bcrypt.hashSync(password, salt);
            const userobj= {
                name,
                password:hashPass,
                email
            } 
            const addUser= await userDB.create(userobj);

            const token = jwt.sign({id:addUser._id,name:addUser.name},process.env.SECRET);
            res.cookie("token", token);
            res.cookie('access-token', token);
            fMsg(res, "Add User Success", {id:addUser._id,name: addUser.name, token:token});
            
        }catch(err){
            next(new Error(err.message))
        }
}


export const checkAuth = async (req, res, next)=>{
    try{
        console.log(req.cookies)
       const token= req.cookies['access-token']
       jwt.verify(token,process.env.SECRET,(err, data)=>{
        if(err){
            next(new Error("Your are not authorize person"))
            return;
        }
        fMsg(res, "Authorization Success", data)
       })
    }catch(err){
            next(new Error (err.message))
    }
}

export const checkFront = async (req, res, next)=>{
    try{
       // console.log(req.cookies)
        const {token}= req.body;
        jwt.verify(token,process.env.SECRET,(err, data)=>{
         if(err){
             next(new Error("Your are not authorize person"))
             return;
         }
         fMsg(res, "Authorization Success", data)
        })
    }catch(err){
        next(new Error (err.message))
    }
}


export const logout = async (req, res, next)=>{
    try{
            res.clearCookie('access-token');
            fMsg(res, "Logout Success");
    }catch(err){
        next(new Error(err.message))
    }
}

