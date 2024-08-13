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
    designation: {
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
    image: {
        type: String
    },
}, { timestamps: true })

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;