
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const util=require("util")
const { SECRET_KEY}=process.env;
const signup = async (req, res) => {
  try {
    const userobj = new UserModel(req.body);
    console.log(userobj);
    const payload=req.body.email;
  const token=jwt.sign(payload,SECRET_KEY)
    const result = await userobj.save();
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const login = async (req, res) => {
  try {
    const email = await UserModel.findOne({ email: req.body.email });
    if (email) {
      const user = email.password;
      if (user == req.body.password) {
        const payload=req.body.email;
        const token=jwt.sign(payload,SECRET_KEY)
        res.status(200).send(token);
      } else {
        res.status(403).send("password incorrect!");
      }
    } else {
      res.status(401).send("email not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const password = req.body.password;

    const email = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { password }
    );
    if (email) {
      return res.status(200).send("updated");
    } else {
      res.status(404).send("can not find account to update");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateEmail = async (req, res) => {
  try {
    const { email, newmail } = req.body;

    const newmailconfirm = await UserModel.findOne({ newmail });
    if (newmailconfirm) {
      return res.status(401).send("an account your new mail already exists");
    }
    const user = await UserModel.findOneAndUpdate(
      { email },
      { email: newmail }
    );
    if (user) {
      console.log(user);
      return res.status(200).send("updated");
    } else {
      res.status(404).send("can not find account to update");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const allusers = async (req, res) => {
  try {
   
      
        const users = await UserModel.find();
        res.send(users)
        console.log("---- users ---- : ", users);
        //  res.status(200).send(users);
      }
    
   catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};


const protect=async(req,res,next)=>{
  try{
 const testtoken=req.headers.authorization;

 let token;
 if(testtoken){
  token=testtoken.split(' ')[1];
 
 }
if(!token){
next("no token provided")
}


 const decodedtoken= jwt.verify(token,SECRET_KEY);
 console.log("after verify",decodedtoken)
 next()
  }
  catch(err){
    res.status(500).send(err)
  }

  


}
module.exports = { signup, login, updatePassword, updateEmail, allusers,protect };
