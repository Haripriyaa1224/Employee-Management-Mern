import express from 'express';
import { createEmployee, listEmployees, updateEmployee, removeEmployee } from '../controllers/employee.js';
import multer from 'multer';

//Image storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const router = express.Router();

router.post('/create', upload.single('image'), createEmployee);
router.get('/list', listEmployees);
router.put('/update/:id', upload.single('image'), updateEmployee);
router.delete('/delete/:id', removeEmployee);

export default router;