const model = require('./model.js')
const { validate } = require('deep-email-validator')
const nodemailer = require("nodemailer");

module.exports = {
    viewProducts: async (req, res) => {
        const { page } = req.query
        const products = await model.find({}).skip(6 * (page - 1)).limit(6)
        res.send(products)
    },

    sendMessage: async (req, res) => {
        const { name, email, message } = req.body
        const mailRes = await validate(email)
        if (!mailRes.valid)
            return res.status(401).send()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jihed.yh44@gmail.com",
                pass: process.env.NODEMAILER_PASSCODE,
            },
        });

        const info = await transporter.sendMail({
            from: email,
            subject: "Mail from " + name,
            to: "jihed.yh44@gmail.com",
            text: email + "\n" + message
        })
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())

    },

    createCourse: async (req, res) => {
        const { name, price, photo } = req.body
        const newCourse = new model({ name, price, photo })
        await newCourse.save().then(() => res.send(200)).catch(() => res.send(500))
    },

    deleteCourse: async (req, res) => {
        const { id } = req.query
        await model.findOneAndDelete({ _id: id }).then(() => res.sendStatus(200))
    },

    editCourse: async (req, res) => {
        const { id, name, price, photo } = req.body
        await model.findOneAndUpdate({ _id: id }, { name, price, photo })
            .then(() => res.sendStatus(200))
    }
}