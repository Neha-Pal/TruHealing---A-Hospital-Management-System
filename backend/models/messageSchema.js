import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:[3,"First name Must contain atleast 3 letters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength:[3,"Last name Must contain atleast 3 letters!"]
    },
    email:{
        type: String,
        required: true,
        validate:[validator.isEmail,"Please provide a valid email!"]
    },
    phone:{
        type: String,
        required: true,
        minLength:[10,"Phone Number Must contain atleast 10 digits!"],
        maxLength:[10,"Phone Number Must contain exact 10 digits!"]
    },
    message:{
        type: String,
        required: true,
        minLength:[10,"Message Must contain atleast 10 characters!"]
    },
});

export const Message = mongoose.model("Message",messageSchema);