import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
export const signup =  async(req,res) => {

  try {
    const {fullName,username, password, confirmPassword, gender} = req.body;
    if(password != confirmPassword){
      return res.status(400).json({message: "Password and confirm password do not match!"})
    }
    const user = await User.findOne({username});
    if(user){
      return res.status(400).json({message: "user already exists"});  
    }

    //we have to hash the password and save it to the database, 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //default avatar::: https://avatar-placeholder.iran.liara.run/

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}` 
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}` 


    const newUser = new User({
      fullName,
      username,
      password: hash,
      gender,
      profilePic: gender === 'male' ? maleProfilePic : femaleProfilePic
    })

    await newUser.save()

    if(newUser){
      //generate the jwt token here, and then store it in cookie! 
      generateToken(newUser._id, res);
      
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    }else{
      res.status(400).json({message: "invalid credentials"});
    }
   } catch (error) {
       console.log("Error in signup controller",error.message); 
    res.status(500).json({message: "internal server Error"})
  } 
};

export const login =  (req,res) => {
  res.send("This is the login route");
};

export const logout =  (req,res) => {
  res.send("This is the logout route");
};
