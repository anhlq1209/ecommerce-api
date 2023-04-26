const { generateToken } = require('../config/jwtToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodbId')
const { generateRefreshToken } = require('../config/refreshtoken')
const jwt = require('jsonwebtoken')



// Create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const findUser = await User.findOne({ email: email })
  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body)
    res.json(newUser)
  } else {
    throw new Error("User Already Exists")
  }
})

// Login a user
const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const findUser = await User.findOne({ email: email })

  if (findUser && await findUser.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findUser?._id)
    const updateuser = await User.findByIdAndUpdate(
      findUser?.id,
      {
        refreshToken: refreshToken
      },
      {
        new: true,
        runValidators: true
      }
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    })

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    })
  } else {
    throw new Error("Invalid Credentials")
  }

})

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies

  if (!cookie?.refreshToken) throw new Error("No refresh token in cookie")
  const refreshToken = cookie?.refreshToken
  const user = await User.findOne({ refreshToken })
  if (!user) throw new Error("No Refresh token present in db or not matched")
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded)
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token")
    }
    const accessToken = generateToken(user?._id)
    res.json({ accessToken })
  })
})

// Logout a user
const logoutUserController = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if(!cookie?.refreshToken) throw new Error("")
  const refreshToken = cookie?.refreshToken
  const user = await User.findOne({refreshToken})
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    })
    return res.sendStatus(204)
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: ""
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  })
  res.sendStatus(204)
})

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  validateMongoDbId(_id)

  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
        runValidators: true
      }
    )

    res.json(updateUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()
    res.json(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// Get user by id
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getUser = await User.findById(id)
    res.json({ getUser })
  } catch (error) {
    throw new Error(error)
  }
})

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.json({ deleteUser })
  } catch (error) {
    throw new Error(error)
  }
})

// Block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true
      },
      {
        new: true,
        runValidators: true
      }
    )
    res.json({
      message: 'User Blocked'
    })
  } catch (error) {
    throw new Error(error)
  }

})

// Unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false
      },
      {
        new: true,
        runValidators: true
      }
    )
    res.json({
      message: 'User UnBlocked'
    })
  } catch (error) {
    throw new Error(error)
  }

})



module.exports = {
  createUser,
  loginUserController,
  updateUser,
  getAllUser,
  getUserById,
  deleteUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUserController
}