const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { SECRETKEY } = require("../../config");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");
const {validateRegisterInput, validateloginInput} = require('../../utils/validator')


function generateToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        "123456",
        { expiresIn: 1440 }
      )
}

module.exports = {
  Mutation: {
    // Here _ is a Parent (RegisterInput)
    // info is general information like metadata
    //Destructure from args
    // register(_,args,context,info) {
        async login(_,{username,password}){
            const {errors,valid}=validateloginInput(username,password)

            if(!valid){
                throw new UserInputError('Errors',{errors})
            }

            const user  = await User.findOne({username})
            if(!user){
                errors.general = 'User Not Found'
                throw new UserInputError('User Not Found',{errors})
            }
            const match  =await bcrypt.compare(password,user.password)

            if(!match){
               errors.general = 'Wrong Credentials'
               throw new UserInputError('Wrong Credentials',{errors}) 
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token,
              };
        },
    async register(
      _,
      { registerInput: { username, password, email, confirmPassword } }
    ) {
      //TODO :  validate user data
      const {valid, errors} = validateRegisterInput(username, password, email, confirmPassword)
      if(!valid){
          throw new UserInputError('Errors',{errors})
      }
      //TODO :  make sure user Doesn't Already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError(
          "User Already Exist Please Register with Another Email",
          {
            errors: {
              username: "This User Name used",
            },
          }
        );
      }
      // hash password and create an Authenticated Token
      password: await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
