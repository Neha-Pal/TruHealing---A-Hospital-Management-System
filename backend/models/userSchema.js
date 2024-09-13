import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First Name Is Required!"],
        minLength:[3,"First name Must contain atleast 3 letters!"]
    },
    lastName:{
        type: String,
        required: [true, "Last Name Is Required!"],
        minLength:[3,"Last name Must contain atleast 3 letters!"]
    },
    email:{
        type: String,
        required: [true, "Email Is Required!"],
        validate:[validator.isEmail,"Please provide a valid email!"]
    },
    phone:{
        type: String,
        required: [true, "Phone Is Required!"],
        minLength:[10,"Phone Number Must contain atleast 10 digits!"],
        maxLength:[10,"Phone Number Must contain exact 10 digits!"]
    },
    adhar:{
        type: String,
        required: [true, "Adhar Is Required!"],
        minLength:[12,"adhar Must contain atleast 12 digits!"],
        maxLength:[12,"adhar Must contain exact 12 digits!"]
    },
    dob:{
        type: Date,
        required: [true,"DOB is required"]
    },
    gender:{
        type:String,
        required: [true, "Gender Is Required!"],
        enum:["Male","Female"]
    },
    password:{
        type: String,
        required: [true, "Password Is Required!"],
        minLength:[8,"Password must contain 8 digits!"],
        select: false
    },
    role:{
        type: String,
        required: [true, "User role Is Required!"],
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type: String
    },
    docAvatar:{
        public_id : String,
        url : String,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 8);
});


userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebtoken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}

export const User = mongoose.model("User",userSchema);