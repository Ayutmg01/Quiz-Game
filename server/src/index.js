const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 8000
const connect = require('./db/connection')
const userRoute = require('./routes/users')
app.use(userRoute)
connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})