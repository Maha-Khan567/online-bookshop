
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");


const cors = require('cors');
const bcrypt = require('bcrypt');
const  dotenv= require('dotenv');
const  jsonwebtoken= require('jsonwebtoken');
const  multer= require('multer');


const uri = process.env.MONGO_URI;


console.log(process.env.MONGO_URI);
mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('Connection error', err));


  const app = express();
  app.use(express.json());
  app.use('/', require('./routes/authRoutes'));
   app.use('/', require('./routes/productRoutes'));
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
