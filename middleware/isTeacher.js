const Admin = require("../model/Staff/Admin")
const Teacher = require("../model/Staff/Teacher")
const teacherRouter = require("../routes/staff/teacherRouter")
const verifyToken = require("../utils/verifyToken")
const isTeacher = async (req,res,next) => {
    // find the user
    const userId = req?.userAuth?._id
    const teacherFound = await Teacher.findById(userId)

    // check if admin 
    if (teacherFound?.role === 'teacher') next()
    else next(new Error('Access denied, teachers only'))
}

module.exports = isTeacher