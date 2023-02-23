const express=require("express")
const cors = require("cors");
const { connection } = require("./config/db");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const {UserModel} = require("./modules/User.model");

const {flightRouter}=require("./routes/flight.route")




const app = express();
app.use(express.json())
app.use(cors({
    origin : "*"
}))


app.get("/",(req,res)=>{
    res.send("Welcome To HomePage")
})

// register

app.post("/register", async (req, res) => {
   
    const {name,email, password} = req.body;
    const userPresent = await UserModel.findOne({email})

    if(userPresent?.email){
        res.send("User already exist")
    }
    else{
        try{
            bcrypt.hash(password, 5, async function(err, hash) {
                const user = new UserModel({name,email,password:hash})
                await user.save()
                res.send("User Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something wrong, please try again later")
       }
    }
    
})

// ......login here

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const h_password = user[0].password;
        bcrypt.compare(password, h_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})

app.use("/", flightRouter)




app.listen(8080, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 8080")
})


