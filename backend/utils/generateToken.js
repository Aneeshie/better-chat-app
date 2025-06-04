import jwt from "jsonwebtoken"

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
      expiresIn: "15d"
    });
    res.cookie("jwt",token,{
      maxAge: 15*24*60*60&1000, //ms format 
      httpOnly: true, //prever XSS attacks or cross-side scripting attacks! 
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    })
  
    console.log("Token created successfully"); 

  }catch(error){
    console.log("error generating the token",error.message);
    res.status(500).json({message: "internal server error"});
  }
}

export default generateToken;
