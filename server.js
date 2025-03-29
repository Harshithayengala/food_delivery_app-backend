//importing all required external modules after installation
const express =require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcyrpt=require('bcryptjs')

//Middleware
const PORT=8000
const app=express()
app.use(express.json())

//Connecting Mongodb Atlas
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully..")
).catch(
    (err)=>console.log(err)
)
//API landing page http://localhost:8000/
app.get('/', (req, res) => {
    res.send('<h1 align=center>Welcome to the backend and week2 project</h1>');
});

//API Registration Page
app.post('/register',async(req, res)=>{
const {user,email,password}=req.body
    try{
        const hashedPassword=await bcyrpt.hash(password,10)
        const NewUser=new User({User,email,password})
        await NewUser.save()
        console.log("New User is registered successfully...")
        res.json({message:'User created...'})
     }
    catch(err){
        console.log(err)
    }
})

//API Login Page
app.post('/login',async(req, res)=>{
    const {email,password}=req.body
    try{
        const User=await User.findOne {email});
        if (!User || !(await bcyrpt.compare(password,user.password)))
        {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        res.json({ message: "Login Successfully", username: user.username})
    }
    catch(err)
    {
    console.log(err)
    }
})

//Server running and testing
app.listen(PORT,(err)=>{
    if (err){
        console.log(err)
    }
    console.log("Server is running on port| This sarwar :" +PORT)
})
