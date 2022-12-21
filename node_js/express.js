const express = require("express")
const userRouter = require("./routers/userRouter")
const topicRouter = require("./routers/topicRouter")

// initialising exxpress dependencies
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// if api call contains user it will go to userRouter, if it contains topic it will go to topicRouter 
app.use('/api/user', userRouter)
app.use("/api/topic", topicRouter)


const port = 5000;
app.listen(port, () => {
    console.log("server running on " + port)
})