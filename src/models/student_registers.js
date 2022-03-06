const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    enrollment_no:{
        type:String,
        required:true,
        // unique:true

    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    course:{
        type:String,
        required:true
    },
   year_of_graduation:{
        type:Number,
        // required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
})

const Register= new mongoose.model("Student_register",studentSchema);
module.exports=Register;