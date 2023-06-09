const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: 'riaavarsani31@gmail.com',
    pass: 'zrryezliqqzgmpga'
  }
});


exports.getRefreshToken = async (req, res) => {


  try {

    let refreshToken = req.body;
    const decoded = jwt.verify(refreshToken.refreshToken, process.env.REFRESH_TOKEN)
    const user = await User.findOne({  _id: decoded._id});

    const token = await user.genrateAccessAuthToken()
    res.json({
      success: true,
      message: 'token created',
      token
    })
  }
  catch (error) {
    res.json({
      success: false,
      message: 'error in creating token',
      status: 500
    })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.genrateAccessAuthToken()
    const refreshToken = await user.genrateRefreshAuthToken()
    res.send({ user, token, refreshToken })
  }
  catch (e) {
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

 // console.log(req.body);

  const user = new User(req.body)
  //console.log(user);
  try {

    await user.save()
    const token = await user.genrateAccessAuthToken()
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
    // console.log(req.body);
    // console.log(req.file);
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    //console.log(req.params.id);
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
        return user.save();
      }).then(result => {

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


exports.verifyToken = async (req, res) => {

  const token = req.params.token;

  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(err)
  }

};


exports.postNewPassword = async (req, res) => {
  try {
    //console.log(req.body);
    const newPassword = req.body.newPassword;
    const passwordToken = req.body.resettoken;
    const hashPasssword = await bcrypt.hash(newPassword, 8)
    const UpdatedUser = await User.updateOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() }
    },
      {
        $set: {
          password: hashPasssword,
        },
      }
    );
   // console.log(UpdatedUser);
  } catch (error) {
    console.log(error);
  }



};





