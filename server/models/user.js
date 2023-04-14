const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "user",
      },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    resetToken:{
        type:String
    },
    resetTokenExpiration:{
        type:String
    },

   

    password: {
        type: String,   
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("invalid password")

            }
        }
    }
}
,{
    timestamps:true
}
)

userSchema.methods.genrateAccessAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id: user._id.toString()} , process.env.ACCESS_TOKEN  , {expiresIn:"10s"})
   // await user.save()
    return token;
}

userSchema.methods.genrateRefreshAuthToken = async function(){
    
    const user = this 
    const RefreshToken = jwt.sign({_id: user._id.toString()} , process.env.REFRESH_TOKEN)
   // user.refreshToken = this.refreshToken
   // await user.save()
    return RefreshToken;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) 
        throw new Error('password doesn`t match')
    return user;    
}


//hash the plain text password
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User

