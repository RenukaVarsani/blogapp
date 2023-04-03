const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:'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'
//     }
//   })
// );


 exports.login=async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.genrateAuthToken()
        res.send({user,token})
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

exports.logout= async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e) {
        res.status(500).send()
    }
}

exports.createUser = async (req, res) => {
    
  const user = new User(req.body)

  try {

      await user.save()
      const token = await user.genrateAuthToken()
      res.status(201).send({ user, token })

  } catch (e) {
    console.log(e.message);
      res.status(400).send(e.message)
  }
}


exports.getUserData= async (req, res) => {
  try {
      const users = await User.find({})
      res.send(users)
  } catch (e) {
    console.log(e.msg)
      res.status(400).send(e)
  }
}

exports.getUser =  async (req, res) => {
    res.send(req.user)
}

exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}



exports.deleteUser =  async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    } 
}

// exports.postReset = async(req, res) => {

//   const token =randomstring.generate({
//     length:12,
//     capitalization:"lowercase"})

//     try{
//       User.findOne({email:req.body.email}).then
//       (user=>{
//         if(!user){
//           return res.status(400).send({ error: 'Invalid email' })

//         }
//         user.resetToken=token;
//         user.resetTokenExpiration =Date.now()+ 3600000;
        
//       }).then(result=>{
//         res.redirect('/login');
//         transporter.sendMail({
//           to: req.body.email,
//           from: 'riaavarsani@test.com',
//           subject: 'Password reset',
//           html: `
//             <p>You requested a password reset</p>
//             <p>Click this <a href="http://localhost:8080/reset/${token}">link</a> to set a new password.</p>
//           `
//         });
//         res.redirect('/login')
      

//       })

//     }catch(e){
//           console.log(e.error);
//     }

// }

// exports.getNewPassword = (req, res, next) => {
//   const token = req.params.token;
//   User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
//     .then(user => {
//       let message = req.flash('error');
//       if (message.length > 0) {
//         message = message[0];
//       } else {
//         message = null;
//       }
//       res.redirect();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.postNewPassword = (req, res, next) => {
//   const newPassword = req.body.password;
//   const userId = req.body.userId;
//   const passwordToken = req.body.passwordToken;
//   let resetUser;

//   User.findOne({
//     resetToken: passwordToken,
//     resetTokenExpiration: { $gt: Date.now() },
//     _id: userId
//   })
//     .then(user => {
//       resetUser = user;
//       return bcrypt.hash(newPassword, 12);
//     })
//     .then(hashedPassword => {
//       resetUser.password = hashedPassword;
//       resetUser.resetToken = undefined;
//       resetUser.resetTokenExpiration = undefined;
//       return resetUser.save();
//     })
//     .then(result => {
//       res.redirect('/login');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };




