import express from 'express';
import dotenv from 'dotenv/config.js';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 8080;


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Connected to DB')
})
.catch(err =>{
    console.log('Something went wrong connecting to DB', err)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})
