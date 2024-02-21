import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const tagSchema = new Schema({
    slug:{type:String, required:true, unique:true},
    name:{ type:String, required:true, unique:true}
})

const tag=mongoose.model("tag", tagSchema);
export default tag;