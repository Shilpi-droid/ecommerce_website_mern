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
    const {email}=req.body
    userModel.findOne({email:email},(err,result)=>{
        console.log(result)
        console.log(err)
        if(result)
        {
            res.send({message: "Email id is already registered",alert:false})
        }
        else{
            const data=userModel(req.body)
            const save=data.save()
            res.send({message: " Successfully signed up",alert:true})
        }
    })
})


app.post("/login",(req,res)=>{
    console.log(req.body)
    const {email}=req.body
    userModel.findOne({email:email},(err,result)=>{
                
        if(result)
        {
            console.log(result)
            const dataSend={
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            console.log(console.log)
            res.send({message: "Logged in successfully",alert:true,data:dataSend})
        }
        else{
            res.send({message: " This email has not been registered",alert:false})
        }
    })
})


//product section 
const schemaProduct=mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model("product",schemaProduct)

app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

app.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  })

app.listen(PORT,()=>console.log("server is running at port "+PORT))

