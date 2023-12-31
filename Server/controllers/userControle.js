import { response } from "express";
import bcrypt from "bcrypt";
import db from "../db/database.js";
import User from "../models/UserSchema.js";
import connectToMongoDb from "../db/database.js";
//import session from 'express-session'
import { verifyLoggedIn } from "../controllers/sessionController.js";

const handleUserLogin = (request, response) => {
  const { email, password } = request.body;
  //filed missing
  if (!email || !password) {
    response.status(400).json({ message: "Missing Email or Password" });
    return;
  }
  User.findOne({ email: email }).then((user) => {
    if (user) {
      //setAuth(user);
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (isValidPassword) {
        //create session details
        request.session.email = email;
        request.session.name = user.name;
        request.session.user = user;

        console.log("session check:", request.session);

        //console.log(request.session.user._id.toHexString())
        response.json({
          message: "Logged in Successfully",
          isAuthenticated: true,
          name: user.name,
          email: user.email,
          _id: user._id,
        });
        // request.session.email = email
        //verifyLoggedIn()
      } else {
        response.status(401).json({ message: "Incorrect password" });
      }
    } else {
      response.status(401).json({ message: "User could not be found" });
    }
  });
};

//Logout
const handleLogout = (req, res) => {
  req.session.destroy();
  return res.json({
    message: "Logout success",
    isAuthenticated: false,
  });
};
export { handleUserLogin, handleLogout };
