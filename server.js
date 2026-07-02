
const express=require('express')

const cors = require('cors');
const bcrypt = require('bcrypt');
const  dotenv= require('dotenv');
const  jsonwebtoken= require('jsonwebtoken');
const  multer= require('multer');

const mongoose = require('mongoose');

require("dotenv").config();

const uri = process.env.MONGO_URI;



mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('Connection error', err));
