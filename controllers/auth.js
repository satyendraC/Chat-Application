

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  let pwd;

  bcrypt.hash(password, 12).then((hashedpwd) => {
    console.log(hashedpwd);
    pwd = hashedpwd;
    return User.findOne({
        where: { email: email }
    })
  })
  .then(result => {
    if(result){
        res.status(200).json({
            message: "User Already present",
            user : result
        });
    }
    else{
        User.create({
            name : name,
            email : email,
            phone : phone,
            password : pwd
       })
       .then(response => {
           res.status(200).json({
               message: "User Created SuccessFully",
               user : response
           });
       })
       .catch((err)=> {
           
           if(!err.statusCode){
               err.statusCode = 500;
           }
           next(err);
       })
    }
 })
  .catch((err)=> {
   
    if(!err.statusCode){
        err.statusCode = 500;
    }
    next(err);
  })
};

exports.signIn = (req, res, next) => {
    const email = req.body.email;
    const password  =  req.body.password;
    let loadedUser;
    User.findOne({
        where: { email: email }
    })
    .then((user) => {
        if(!user){
            const err = new Error("User with this email not found.");
            err.statusCode = 404;
            throw err;
        }
        else{
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        }
    })
    .then((isEqual) => {
        if(!isEqual)
        {
            const err = new Error("Password is incorrect.");
            err.statusCode = 401;
            throw err;
        }
        else
        {
            const token = jwt.sign({
                email : loadedUser.email,
                loadedUser : loadedUser.id.toString()
            }, "checkUserIsThereOrnot", {expiresIn: '24hrs'});

            res.status(200).json({
                message: "Logged in Successfully",
                token : token,
                user: loadedUser
            });
        }
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}
