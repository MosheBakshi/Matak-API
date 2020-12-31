const express = require('express')
const cors = require('cors')


// requirements for DB - routers
const db = require('./db')
const pathRouter = require('./routes/path-router')
const userRouter = require('./routes/user-router')
const organizationRouter = require('./routes/organization-router')
const statusRouter = require('./routes/status-router')
const carRouter = require('./routes/car-router')
const notificationRouter = require('./routes/notification-router')
//


const app = express()
const apiPort = 3000

// uses
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// app use of routers
app.use('/api', pathRouter)
app.use('/api', userRouter)
app.use('/api', organizationRouter)
app.use('/api', statusRouter)
app.use('/api', carRouter)
app.use('/api', notificationRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

//or and Aviel and Eyal - update for ctrls - need to confirm all ctrls are in same syntax and all the rest of the files.

