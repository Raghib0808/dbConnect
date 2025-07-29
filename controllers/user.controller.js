import crypto from 'crypto';
import User from '../model/user.model.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


const registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({ name, email, password });

    if (!user) {
      return res.status(400).json({
        message: "Failed to create user"
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;

    await user.save();

    console.log(`Verification token for ${email}: ${token}`);

    
    

    // 📧providing email service through nodemailer and new enmail through mailtrap
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDEREMAIL,
      to: user.email,
      subject: "Please verify your email",
      text: `Hi, please click on the following link to verify your email: ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
      html: `<p>Hi, please click <a href="${process.env.BASE_URL}/api/v1/user/verify/${token}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);


    return res.status(201).json({
      message: "User registered successfully",
      sucess: true,
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error:err.message
    });
  }
};

const verifyUser = async (req, res) => {
    // get token from params
    // validate
    // find user based on token
    // set isVerified to true
    // remove verificationtoken
    // save user
    const {token}= req.params;
    if(!token){
      return res.status(400).jsong({
        message: "Token is invalid or not found"
      })
    }

    const user = await User.findOne({ verificationToken: token });
    if(!user){
      return res.status(400).json({
        message: "User not found"
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(200).json({
      message: "User Vefified Sucessfully",
      user: user
    })


}

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    try{
        const user = User.findOne({email});
        if(!user){
          return res.status(400).json({
            message: "User not found"
          })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return res.status(400).json({
            message:'Passowrd not matched'
          })
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET ,{
          expiresIn: '24h'
        })

      //  🍪🍪🍪🍪 utilizing cookies to store the token
      const cookieOptions ={
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      }
      res.cookie('token', token, cookieOptions);

      res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        },
        token: token
      })

    }
    catch(err){
        return res.status(500).json({
          message: "Internal Server Error",
          error: err.message
        });
    }
}

export { registerUser, verifyUser,loginUser };
