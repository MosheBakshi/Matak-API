const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

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
app.use(cookieParser())
const apiPort = 3000

// uses
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
        'https://www.hitprojectscenter.com/matakapinew']}
    ))
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app use of routers
app.use('/api', pathRouter)
app.use('/api', userRouter)
app.use('/api', organizationRouter)
app.use('/api', statusRouter)
app.use('/api', carRouter)
app.use('/api', notificationRouter)

// Serve up production assets
app.use(express.static('Client/build'));
// Serve up the index.html
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

//final version after cleaning.