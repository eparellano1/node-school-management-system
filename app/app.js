const express = require('express')
const morgan = require('morgan')

const { globalErrHandler, notFoundErr } = require('../middleware/globalErrHandler')
const adminRouter = require('../routes/staff/adminRouter')
const academicYearRouter = require('../routes/academics/academicYearRouter')
const academicTermRouter = require('../routes/academics/academicTermRouter')
const classLevelRouter = require('../routes/academics/classLevelRouter')
const programRouter = require('../routes/academics/programRouter')
const subjectRouter = require('../routes/academics/subjectRouter')
const yearGroupRouter = require('../routes/academics/yearGroupRouter')
const teacherRouter = require('../routes/staff/teacherRouter')

const app = express()

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json()) // pass incoming json data

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl}`)
//     next()
// })

// let user = {
//     name: 'John Does',
//     isAdmin: false,
//     isLogin: false
// }

// const isLogin = (req, res, next) => {
//     if (user.isLogin){next()} 
//     else res.status(401).json({message: 'Unauthorized'})
// }

// const isAdmin = (req, res, next) => {
//     console.log(user.isAdmin)
//     if (user.isAdmin) next()
//     else res.status(401).json({message: 'Unauthorized, you are not admin'})
// }

// app.use(isLogin, isAdmin)

// Routes
// admin express middleware
app.get('/', (req, res) => {
    res.json("Connected")
})
app.use('/api/v1/admins', adminRouter)
app.use('/api/v1/academic-years', academicYearRouter)
app.use('/api/v1/academic-terms', academicTermRouter)
app.use('/api/v1/class-levels', classLevelRouter)
app.use('/api/v1/programs', programRouter)
app.use('/api/v1/subjects', subjectRouter)
app.use('/api/v1/year-groups', yearGroupRouter)
app.use('/api/v1/teachers', teacherRouter)

// Error middlewares
app.use(notFoundErr)
app.use(globalErrHandler)

module.exports = app