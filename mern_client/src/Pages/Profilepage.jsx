import React, { useEffect, useState } from "react";
import MasterLayout from "./Layout/MasterLayout";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const Profilepage = ()=>{
    const [tag, setTag]=useState([]);
    const [language, setLanguage]=useState([]);
    useEffect(()=>{
        axios.get("/article/tagandlanguage").then(({data})=>{
           // console.log(data.result.tag)
            setTag(data.result.tag);
            setLanguage(data.result.language);
            console.log(tag)
        })
    },[])

    return(
        <MasterLayout>
            <div className="bg-card p-4 rounded">
            <button className="btn btn-dark">Create New Article</button>
            <button className="btn btn-dark">Your Article</button>
            <button className="btn btn-dark">Account Setting</button>

            <div className="row mt-3">
                <div className="col-6">
                    <input type="text" className="form-control bg-dark" placeholder="Enter Title"/>
                </div>
                <div className="col-6">
                    <input type="file" className="form-control bg-dark"/>
                </div>
                <div className="col-6 mt-3">
                    <Select options={tag} isMulti={true} placeholder={"Select Tags"}/>
                </div>
                <div className="col-6 mt-3">
                    <Select options={language}  isMulti={true} placeholder={"Select Programming"}/>
                </div>
                <div className="col-12 mt-3">
                <ReactQuill theme="snow" value={"Enter Description"} onChange={()=>{}} />
                </div>
                <div className="col-2 mt-3">
                    <button className="btn btn-primary">Create</button>
                </div>

            </div>
            </div>
        </MasterLayout>
    )
}
export default Profilepage;