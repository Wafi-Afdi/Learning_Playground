const mongoose = require('mongoose')

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(`Error : ${error.message}`)
    }
}

module.exports = connectDB;