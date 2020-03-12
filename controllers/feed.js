
const User = require("../models/user");

const sequelize = require('sequelize')


exports.getUsers = (req, res, next) => {
  userIdSender = req.params.userId;
  console.log(userIdSender)
  User.findAll({where: { id : {
    [sequelize.Op.not]: userIdSender
  }}},{attributes: ['id', 'name', 'email', 'phone', 'createdAt']})
    .then(result => {
      console.log(result)
      res.status(200).json({
        users : result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};