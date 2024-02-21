import languageDB from "../Models/language.js";
import tagDB from "../Models/tag.js";
import { fMsg } from "../Utils/helper.js";

export const getTagsLanguage= async(req, res, next)=>{
    const tag=[];
    const language=[];
    const tagData= await tagDB.find();
    const languageData= await languageDB.find();
    
    tagData.map((d)=>{
        
        tag.push({
            value: d.slug,
            label: d.name
        })
    })

    languageData.map((d)=>{
        language.push({
            value: d.slug,
            label: d.name
        })
    })

    fMsg(res,"Language and Tag", {tag, language})
}

