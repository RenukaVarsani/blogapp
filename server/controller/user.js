const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")
const passwordResetToken = require('../models/reset');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: 'riaavarsani31@gmail.com',
    pass: 'zrryezliqqzgmpga'
  }
});



exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.genrateAuthToken()
    res.send({ user, token })
  } catch (e) {
    console.log(e);
    res.status(500).send()
  }
}

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  }
  catch (e) {
    res.status(500).send()
  }
}

exports.createUser = async (req, res) => {

  console.log(req.body);

  const user = new User(req.body)
  console.log(user);
  try {

    await user.save()
    const token = await user.genrateAuthToken()
    res.status(201).send({ user, token })

  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message)
  }
}


exports.getUserData = async (req, res) => {
  try {

    const PageSize = +req.query.pageSize;
    const CureentPage = +req.query.currentPage;
    const users = await User.find({})
      .skip(PageSize * (CureentPage - 1))
      .limit(PageSize);

    res.send(users)

  } catch (e) {
    console.log(e.msg)
    res.status(400).send(e)
  }
}

exports.getUser = async (req, res) => {
  res.send(req.user)
}

exports.updateUser = async (req, res) => {

  try {

    console.log(req.body);
    console.log(req.file);
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send()
  }
}



exports.postReset = async (req, res) => {

  const token = randomstring.generate({
    length: 12,
    capitalization: "lowercase"
  })

  try {
    User.findOne({ email: req.body.email }).then
      (user => {
        if (!user) {
          return res.status(400).send({ error: 'Invalid email' })

        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

      }).then(result => {
       // res.redirect('/login');
        transporter.sendMail({
          to: req.body.email,
          from: 'renuka.varsani@aspiresoftserv.in',
          subject: 'Password reset',
          html: `
            <h2>You requested a password reset</h2>
            <p>Click this <a href="http://localhost:4200/resetpassword/${token}">link</a> to set a new password.</p>
          `
        }).then((data) => {
          console.log("mail sent successfully");
        }).catch((error) => {
          console.log(error.message);
        });
        //res.redirect('/login')


      })

  } catch (e) {
    console.log(e.error);
  }

}

exports.getUserById = async (req, res) => {
  const _id = req.params.id

  try {
      const user = await User.findOne({ _id })
      if (!user) {
          return res.status(404).send()
      }
      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
}


exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.redirect();
    })
    .catch(err => {
      console.log(err);
    });
};


exports.postNewPassword = (req, res) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then( user => {
      resetUser = user;
      return  bcrypt.hash(newPassword, 8);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postReset = async(req, res) => 

//   const token = randomstring.generate({
//         length: 12,
//        capitalization: "lowercase"  })
    

//   if (!req.body.email) {

//   return res.status(500)
//   .json({ message: 'Email is required' });}

//   const user = await User.findOne({email:req.body.email });

//   if (!user) {

//   return res.status(409).json({ message: 'Email does not exist' });}

//   var resettoken = new passwordResetToken({ _userId: user._id, resettoken: token});

//   resettoken.save() 

  
   
//   passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();

//   res.status(200).json({ message: 'Reset Password successfully.' });

 
//   var mailOptions = {
//   to: user.email,
//   from: 'renuka.varsani@aspiresoftserv.in',
//   subject: 'Node.js Password Reset',
//   text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//   'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//   'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
//   'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//   }
//   transporter.sendMail(mailOptions, (err, info) => {
//   })
  




// exports.getNewPassword = async (req, res) =>{

//   if (!req.body.resettoken) {

//   return res.status(500).json({ message: 'Token is required' });}

//   const user = await passwordResetToken.findOne({resettoken: req.body.resettoken});

//   if (!user)
//    { return res.status(409).json({ message: 'Invalid URL' }); }

//   User.findOneAndUpdate({ _id: user._userId }).
//   then(() => {

//   res.status(200).json({ message: 'Token verified successfully.' });
//   })
//   .catch((err) => {
//   return res.status(500).send({ msg: err.message });
//   });
// }




// exports.postNewPassword=  async (req, res)=> {
//       passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
//         if (!userToken) {
//           return res
//             .status(409)
//             .json({ message: 'Token has expired' });
//         }
  
//         User.findOne({
//           _id: userToken._userId
//         }, function (err, userEmail, next) {
//           if (!userEmail) {
//             return res
//               .status(409)
//               .json({ message: 'User does not exist' });
//           }
          
//           return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
//             if (err) {
//               return res
//                 .status(400)
//                 .json({ message: 'Error hashing password' });
//             }


//             userEmail.password = hash;
//             userEmail.save(function (err) {
//               if (err) {
//                 return res.status(400) .json({ message: 'Password can not reset.' }); }
                
//                 else {
//                 userToken.remove();
//                 return res.status(201) .json({ message: 'Password reset successfully' }); }
  
//             });
//           });
//         });
  
//       })
//   }





