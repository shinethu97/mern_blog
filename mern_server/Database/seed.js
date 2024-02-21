import mongoose from "mongoose";
import tagDB from '../Models/tag.js';
import languageDB from "../Models/language.js";
import slug from 'slug';


//db connect
mongoose.connect('mongodb://127.0.0.1:27017/mern_blogging')
.then(()=>console.log("DataBase Connection Success"))
.catch((err)=> console.log("Database error is "+err))

const tags= ["Web Development", "Design", "UI UX", "Background", "Front Development", "Tutorial", "Tracks", "Articles"];
const programming= ["PHP", "LARAVAL", "REACT JS","VUE JS","JQUERY", "BOOTSTRAP", "NODE JS"];

(async()=>{
    tags.map(async(d)=>{
            await tagDB.create({
                slug:slug(d),
                name:d
            })
    })
    console.log("Tags Database Success")
})();

(async()=>{
    programming.map(async(d)=>{
            await languageDB.create({
                slug:slug(d),
                name:d
            })
    })
    console.log("Languages Database Success")
})();