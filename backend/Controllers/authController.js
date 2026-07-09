const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const Admin = require('../models/admin');

async function registerCustomer(req, res){
    try{
    const {username,password}=req.body;
const customer = await Customer.findOne({ username: username })
  
if(customer)
   { return res.status(400).send("User already exists");
    }

const hashedPassword = await bcrypt.hash(password, 10);
const newCustomer = new Customer({
    username: username,
    password: hashedPassword
});
await newCustomer.save();
console.log("Customer saved!");
res.status(201).send("Registration Successful!");
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function loginCustomer(req, res){
    try{
        
const {username,password}=req.body;
const customer = await Customer.findOne({ username: username })
  
if(!customer)
   { return res.status(404).send("User not found");
    }
const isMatch = await bcrypt.compare(password, customer.password);

    if(!isMatch){
 return res.status(401).send("Incorrect Password!");}
 const payload=
    {
        id:customer._id ,
    role: "customer",
    };
    const JWT_SECRET = process.env.JWT_SECRET ;
    const options={
        expiresIn: '5h', 
    };

 
 try {
    const token = jwt.sign(payload, JWT_SECRET, options);
    return res.status(200).json({
    message: "Login Successful!",
    token: token
});
} catch (error) {
    console.error("Error signing token:", error.message);
}
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


async function loginAdmin(req, res){
 try{
        
const {username,password}=req.body;
const admin = await Admin.findOne({ username: username })
console.log(admin);
  
if(!admin)
   { return res.status(404).send("User not found");
    }
const isMatch = await bcrypt.compare(password, admin.password);

    if(!isMatch){
 return res.status(401).send("Incorrect Password!");}
 return res.status(200).send("Login Successful!");
    }
    catch (error) {
           console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    loginAdmin
};