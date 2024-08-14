import express from 'express';
import dotenv from 'dotenv/config.js';
import mongoose from 'mongoose';
import  EmployeeRouter from './routes/employee.js';
import userRouter from './routes/user.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Connected to DB')
})
.catch(err =>{
    console.log('Something went wrong connecting to DB', err)
})

app.use('/api/employee', EmployeeRouter)
app.use('/images', express.static('uploads')) //to mount images 
app.use('/api/admin', userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})

