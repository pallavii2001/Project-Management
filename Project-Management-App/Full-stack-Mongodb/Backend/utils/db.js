const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;


async function connectDB() {
    try {
        await mongoose.connect(url,{
            dbName: process.env.DB_NAME
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = connectDB;