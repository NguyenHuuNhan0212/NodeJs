const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev');
        console.log('connect successfully');
    } catch (error) {
        console.log('connect fail!!');
    }
}

module.exports = { connect };
