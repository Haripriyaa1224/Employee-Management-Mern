import Employee from "../models/employee.js";
import fs from 'fs';

export const createEmployee = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const newlyCreatedEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
        image: image_filename
    })

    try{
        await newlyCreatedEmployee.save();
        res.json({
            success: true,
            message:'Employee created successfully'
        })
    }
    catch(err){
        console.log(err)
        res.json({success: false, message: 'Error'});
    }
}