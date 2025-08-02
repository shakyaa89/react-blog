const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.pass;
  const phonenum = req.body.phonenum;
  const gender = req.body.gender;

  console.log({ name, email, pass, phonenum, gender });

  if (!name || !email || !pass || !phonenum || !gender) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(409).json({ message: "User Already Exists!" });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const userData = {
      name,
      email,
      pass: hashedPassword,
      phonenum,
      gender,
    };

    const newUser = new User(userData);

    await newUser.save();

    res
      .status(201)
      .json({ message: "User Created Successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  try {
    const user = await User.findOne({ email });

    if (!email || !pass)
      return res
        .status(404)
        .json({ message: "All fields needs to be filled!" });

    if (!user) return res.status(404).json({ message: "Invalid Credentials!" });

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (isMatch) {
      console.log("Token secret:", process.env.ACCESS_TOKEN);
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Logged in successfully!",
        user: user,
        accessToken: token,
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = { registerUser, loginUser };
