const express = require("express")
const { client } = require("../mongoDBConnection")
const router = express.Router();


// this router will be used to verify the usename if username not exixt, it will insert userame with new id 
router.post("/check-usernanme", async (req, res) => {

    const userName = req.body.userName;

    const findUser = await client.db("thewasserstoff").collection("users").findOne({ userName })

    if (!findUser) {

        const insertUser = await client.db("thewasserstoff").collection("users").insertOne({ userName, data: [] })

        res.send({ message: "New user created", _id: insertUser.insertedId })

    } else {

        res.send({ message: "user found", _id: findUser._id })

    }

})

module.exports = router