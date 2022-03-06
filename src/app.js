const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const bodyParser=require("body-parser");
require("./db/conn");
const register=require("./models/student_registers");
const { json } = require("express");
const async = require("hbs/lib/async");

// const jsonParsor=bodyParser.json();

const port=process.env.PORT || 8000;

// app.use(express,json());
app.use(express.urlencoded({extended:true}));

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");

app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register", async (req,res)=>{
    try {
        const password=req.body.password;
        const c_password=req.body.c_password;
        if(password===c_password){
const registerStudent= new register({
    enrollment_no:req.body.enrollment_no,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    course:req.body.course,
    year_of_graduation:req.body.Year_of_graduation,
    password:password,
    confirm_password:c_password
})
const registered=await registerStudent.save();
res.status(201).render("index.hbs");
// res.flash("login successfully");
    }
        else{
            res.send('passwords are not matching');
            return;
        }

        
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
   
})

app.post("/login",async (req,res)=>{
try {
    const email=req.body.email;
    const password=req.body.password;
    const email_username=await register.findOne({email:email});
    if(email_username.password===password){
        res.status(200).render("index");
    }else{
        res.send(`invalid login credentials`);
    }
    

} catch (error) {
    res.status(400).send("invalid login credentials");
}
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})