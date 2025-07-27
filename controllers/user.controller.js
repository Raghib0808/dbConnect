import crypto from 'crypto';
import User from '../model/user.model.js';

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

    console.log(`✅ Verification token for ${email}: ${token}`);

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("registration error:", err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export { registerUser };
