const User = require("../model/UserModel");

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

    const userData = {
      name,
      email,
      pass,
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

    if (!email || !pass) {
      return res
        .status(404)
        .json({ message: "All fields needs to be filled!" });
    }

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    if (pass !== user.pass) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    res.status(200).json({ message: "Logged in successfully!", user: user });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = { registerUser, loginUser };
