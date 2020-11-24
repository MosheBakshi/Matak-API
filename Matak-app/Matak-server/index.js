const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// requirements for DB - routers
const db = require('./db')
const pathRouter = require('./routes/path-router')
const userRouter = require('./routes/user-router')
const organizationRouter = require('./routes/organization-router')
const statusRouter = require('./routes/status-router')
//


const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app use of routers
app.use('/api', pathRouter)
app.use('/api', userRouter)
app.use('/api', organizationRouter)
app.use('/api',statusRouter)
//

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))