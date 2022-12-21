const express = require("express");
const { ObjectId } = require("mongodb");
const { client } = require("../mongoDBConnection")
const router = express.Router();


// thi route will save newly created topic data to mongodb 
router.post("/save", async (req, res) => {

    const body = req.body;    

    const newData = {
        name: body.name,
        desc: body.desc,
        descArray: body.descArray
    }

    const insertTopic = await client.db("thewasserstoff").collection("users").findOneAndUpdate({ _id: ObjectId(body._id) }, { $push: { data: newData } })

    res.send({ message: "user found", insertedTopicData: insertTopic })

})


// thi route will send all topic data from mongodb to user
router.post("/get", async (req, res) => {

    const _id = req.body._id;

    const getTopic = await client.db("thewasserstoff").collection("users").find({ _id: ObjectId(_id) }).toArray()

    res.send({ message: "user found", topicData: getTopic[0] })

})


module.exports = router