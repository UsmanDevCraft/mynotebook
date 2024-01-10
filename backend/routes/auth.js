const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Usmanb@oy';


//ROUTE 1: CREATE USER ENDPOINT
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password required').isLength({ min: 5 }),
] , async (req,res)=>{

    //if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

    const data = {
      user:{
        id: user.id,
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken});
  } catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }


    //   .then(user => res.json(user))
    //   .catch(err =>{ console.log(err) 
    // res.json({error: 'Please enter a unique value'})});
});


//ROUTE 2: LOGIN USER ENDPOINT
router.post('/loginuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res)=>{

  //if there are errors, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!email){
      return res.status(400).json({error: "Please login with correct email/password"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please login with correct email/password"});
    }

    const data = {
      user:{
        id: user.id,
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken});

  } catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});


//ROUTE 3: GET USER DATA FROM AUTHTOKEN
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});


module.exports = router;