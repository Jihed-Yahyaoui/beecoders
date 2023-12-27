const express = require('express')
const { connect } = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const controller = require('./controller.js')

const app = express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.get('/viewproducts', controller.viewProducts)
app.post('/message', controller.sendMessage)
app.post('/createCourse', controller.createCourse)
app.get('/deleteCourse', controller.deleteCourse)
app.post('/editCourse', controller.editCourse)

app.listen(5000, () => console.log("listening on port 5000"))