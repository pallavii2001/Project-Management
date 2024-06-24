require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');


const user=require('./src/users/route');
const auth=require('./src/auth/route')
const project=require('./src/project/route')
const task = require('./src/task/route')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/',user)
app.use('/',auth)
app.use('/',project)
app.use('/',task)


const connectDB = require('./utils/db');
connectDB();

app.listen(3005, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port 3005');
    }
});

app.get('/', (req, res) => {
    res.send('hello world');
});