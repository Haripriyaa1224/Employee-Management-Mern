import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique:true
    },
    phone: {
        type: "Number",
        required: true,
        unique:true
    },
    designaton: {
        type: "String",
        required: true
    },
    gender: {
        type: "String",
        required: true
    },
    course:{
        type: "String",
        required: true
    },
    image:{
        type: "String",
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
}, { timestamps: true })

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;