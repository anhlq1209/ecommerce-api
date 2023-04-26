const { default: mongoose } = require('mongoose')

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log('Database Connected Successfully!')
  } catch (error) {
    console.error('Database ERROR!!!')
  }
};

module.exports = dbConnect;