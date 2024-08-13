import Employee from "../models/employee.js";
import fs from 'fs';
import path from 'path';

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
};

export const listEmployees = async (req, res) => {
    try{
        const employees = await Employee.find({});
        res.json({
            success: true,
            data: employees
        })
    }
    catch(err){
        cosolog.log(err)
        res.json({success: false, message: 'error'})
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;  // Get the employee ID from the URL parameters
    const updates = req.body;    // Get the fields to update from the request body

    try {
        // Find the employee by ID
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // If a new image is uploaded, update the image field
        if (req.file) {
            // Delete the old image file from the uploads folder
            const oldImagePath = path.join('uploads', employee.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            // Update the image field with the new image's filename
            updates.image = req.file.filename;
        }

        // Update the employee's details
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });

        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: updatedEmployee
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Error updating employee' });
    }
};

export const removeEmployee = async (req, res)=>{
    try{
        const employeeToDelete = await Employee.findById(req.body.id);
        fs.unlink(`uploads/${employeeToDelete.image}`,()=>{})
        await Employee.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message:'Employee deleted successfully'
        })
    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }

}