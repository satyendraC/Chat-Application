const Chat = require("../models/chat");
const User = require("../models/user");
const io = require('../util/socket');
const sequelize = require("sequelize")

exports.getChats = (req, res, next) => {
    let data;
    console.log(req.params.id)
    Chat.findAll({where: 
      sequelize.or(
        sequelize.and(
          {user_id_sender: req.params.sender_id},
          {user_id_reciever: req.params.reciever_id}
        ),
        sequelize.and(
          {user_id_sender: req.params.reciever_id},
          {user_id_reciever: req.params.sender_id}
        )

      )
        
    })
      .then(result => {
        data = result;
        return result;
      })
      .then(result => {
        res.status(200).json({
          messages: result
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  exports.sendMessage = (req, res, next) => {
    const message = req.body.message;
    const userIdSender = req.body.userIdSender;
    const userIdReciever = req.body.userIdReciever;

    console.log(req.body);
      // Create post in db
      User.findOne({where: { id : userIdSender }})
        .then(user => {
          if (!user) {
            const err = new Error("User not present");
            err.statusCode = 404;
            throw err;
          } 
          else {
            Chat.create({
              message: message,
              user_id_sender: userIdSender,
              user_id_reciever: userIdReciever
            })
              .then(result => {
                io.getIO().emit('chats', {action: 'send_message', message: {message: result}});
                
                res.status(200).json({
                  message: "message send successfully",
                });
              })
              .catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
              });
          }
        })
        .catch(() => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
  };
  