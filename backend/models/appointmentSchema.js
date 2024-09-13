import mongoose from "mongoose";
import { Mongoose} from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type: String,
        required: [true, "Appointment Date Is Required!"],
    },
    department:{
        type: String,
        required: [true, "Department Name Is Required!"],
    },
    doctor:{
        firstName:{
            type: String,
            required: [true, "Doctor Name Is Required!"],
        },
        lastName:{
            type: String,
            required: [true, "Doctor Name Is Required!"],
        }
    },
    hasVisited:{
        type: Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: [true, "DoctorId Is Required!"],
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required: [true, "PatientId Is Required!"],
    },
    address:{
        type: String,
        required: [true, "Address Is Required!"],
    },
    status:{
        type: String,
        enum: ['Pending','Accepted','Rejected'],
        default: 'Pending',
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);