import { response,request } from "express";
import bcrypt from "bcrypt";
import db from '../db/database.js'
import User from '../models/UserSchema.js'
import connectToMongoDb from '../db/database.js'

// connectToMongoDb().then((_)=>{
//   console.log('string connected')
// }) 

const handleNewUser = async (request, response) => {
  const { name, email, password, location, DOB } = request.body;
  const passwordHash = bcrypt.hashSync(
    request.body.password,
    bcrypt.genSaltSync()
  );
    //email duplicate error
    User.findOne({ email: email }).then(async (user) => {
      if (user) {
        response.status(400).json({ message: "Email already exist" });
        return;
      }

//filed missing
    if (!name || !email || !password) {
      response.status(400).json({ message: "missiong mandatory fields" });
      return;
    }
    if (password.length < 8) {
      response
        .status(400)
        .json({ message: "password must be 8 characters or more" });
      return;
    }
    //digit includes check  if a string contains a certain type of character checking use 'test' instead includes
    else if (!/\d/.test(password)) {
      response
        .status(400)
        .json({ message: "Password must contain at least one digit." });
      return;
    }
    //Uppercase check
    else if (!/[A-Z]/.test(password)) {
      response
        .status(400)
        .json({ message: "Password must contain at least one UpperCase" });
      return;
    }
    //lowercase check
    else if (!/[a-z]/.test(password)) {
      response
        .status(400)
        .json({ message: "Password must contain at least one LowerCase" });
      return;
    };

  //No error create new User
  try {
      // Create a new user document using the User model
      const newUser = await User.create({
          name,
          email,
          password:passwordHash,
          location,
          DOB,
      });

      console.log('controller page user', newUser);
      // Respond with the created user
      response.status(201).json({ message: "New account created success", user: newUser});
  } catch (error) {
      console.error(error);
      response.status(400).json({ Error: "New account creation failed." });
  }
}
)}


  const getAllUsers = (request, response) => {
    User.find()
      //.toArray()
      .then((user) => {
        response.json({ users:user });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        response.status(500).json({ error: "An error occurred while fetching users." });
      });
  };
  
  
export { getAllUsers, handleNewUser };





  //////////////////////////////////////////////////////////
    //   //needs to includes at least one lowercase
    //   if (!/[A-Z]/.test(password)) {
    //     response.status(400).json({
    //       message: "Your password needs at least one uppercase letter.",
    //     });
    //     return;
    //   }
    //   //needs to includes at least one Uppercase
    //    if (!/[a-z]/.test(password)) {
    //     response.status(400).json({
    //       message: "Your password needs at least one lowercase letter.",
    //     });
    //     return;
    //   }
    //   //needs to includes at least one digit
    //   if (!/[0-9]/.test(password)) {
    //     response
    //       .status(400)
    //       .json({ message: "Your password needs at least one number." });
    //     return;
    //   }

  