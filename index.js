const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://gaurav:gaurav@user.o3sbyjy.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log('Mongo Db has been connected');
}).catch((err)=>{
  console.log("Not Connected");
  console.error(err);
})

const userSchema = new mongoose.Schema({
  name : {type: String, requried: true},
  email :{type: String, requried: true , unique : true},
  number : {type : String, requried : true}
})

//Model For Mongoose
const User = mongoose.model('Students', userSchema);

const UserList = async()=>{
  let userData = await User.find();
  console.log(userData);
}

UserList();

const user = [];

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("regestion");
});

app.post("/scusses", (req, res) => {
  userName = req.body.name;
  email = req.body.email;
  number = req.body.number;

  const add = async()=>{
    let data = new User({
      name : userName,
      email : email,
      number : number,
    })
    data.save();
    console.log();
  
    
  }
 
  add();

    res.render("scusses");
}
);
app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
