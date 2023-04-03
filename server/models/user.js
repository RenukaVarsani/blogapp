const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin","user"]
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
    password: {
        type: String,
        required: true,
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


userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.genrateAuthToken = async function(){
    const user = this 
    console.log(user);
    const token = jwt.sign({_id: user._id.toString()},'crud')
    console.log(token);

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
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