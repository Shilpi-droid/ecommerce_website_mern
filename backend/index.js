const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const dotenv= require("dotenv").config()

const PORT=process.env.PORT || 8080

const app=express()
app.use(express.json({limit: "10mb"}))
app.use(cors())

console.log(process.env.MONGODB_URL)
//mongoose connection
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))

//schema
    const userSchema =mongoose.Schema({
        firstName: String,
        lastName: String,
        email: {
            type:String,
            unique:true
        },
        password: String,
        confirmPassword: String,
        image : String
    })

//model 

const userModel= mongoose.model("user",userSchema)


//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.post("/signup",(req,res)=>{
    console.log(req.body)
})

app.listen(PORT,()=>console.log("server is running at port "+PORT))