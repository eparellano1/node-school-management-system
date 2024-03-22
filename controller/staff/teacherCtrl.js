const AsyncHandler = require("express-async-handler")
const Teacher = require("../../model/Staff/Teacher")
const { hashPassword, isPassMatched } = require("../../utils/helpers")
const generateToken = require("../../utils/generateToken")

// @desc Admin register teacher
// @route POST /api/v1/teachers/admin/register
// @access Private
exports.adminRegisterTeacher = AsyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const teacherFound = await Teacher.findOne({ email })
    if (teacherFound) throw new Error('Teacher already employed')

    // hash password
    const hashedPassword = await hashPassword(password)
    
    // create teacher
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        status: 'success',
        message: 'Teacher registered successfully',
        data: teacherCreated
    })
})

// @desc Login a teacher
// @route POST /api/v1/teachers/register
// @access Private
exports.loginTeacher = AsyncHandler(async(req, res) => {
    const { email, password } = req.body

    // find the user
    const teacher = await Teacher.findOne({ email })
    // verify password
    const isMatched = await isPassMatched(password, teacher?.password)
    if (!teacher || !isMatched) return res.json({ message: "Invalid login credentials" })
    else res.status(201).json({
        status: 'success',
        message: 'Teacher logged in successfully',
        data: generateToken(teacher?._id)
    })
    
})

// @desc Get all teachers
// @route GET /api/v1/admin/teachers
// @access Private admin only
exports.getAllTeachersByAdmin = AsyncHandler(async(req, res) => {
    const teachers = await Teacher.find()

    res.status(200).json({
        status: 'success',
        message: 'Teachers fetched successfully',
        data: teachers
    })
})

// @desc Get single teacher
// @route GET /api/v1/teachers/:teacherID/admin
// @access Private admin only
exports.getTeacherByAdmin = AsyncHandler(async(req, res) => {
    const teacherID = req.params.teacherID 

    // find the teacher 
    const teacher = await Teacher.findById(teacherID)
    if (!teacher) throw new Error('Teacher not found')

    res.status(200).json({
        status: 'success',
        message: 'Teacher fetched successfully',
        data: teacher
    })
})

// @desc Teacher profile
// @route GET /api/v1/teachers/profile
// @access Private teacher only
exports.getTeacherProfile = AsyncHandler(async(req, res) => {
    const teacher = await Teacher.findById(req.userAuth?._id).select('-password -createdAt -updatedAt')
    if (!teacher) throw new Error('Teacher not found')

    res.status(200).json({
        status: 'success',
        message: 'Teacher profile fetched successfully',
        data: teacher
    })
})

// @desc Teacher updating own profile
// @route UPDATE /api/v1/teachers/:teacherID/update
// @access Private Teacher Only
exports.teacherUpdateProfile = AsyncHandler(async(req, res) => {
    const { email, name, password } = req.body
    // if email is taken
    const emailExists = await Teacher.findOne({ email })
    if (emailExists) throw new Error('This email is taken/exists')

    // check if user is updating password
    if (password){
        // update 
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, { 
            email,
            password: await hashPassword(password),
            name 
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: teacher, 
            message: 'Teacher updated successfully'
        })
    } else {
        // update teacher without password
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, { 
            email,
            name 
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: teacher, 
            message: 'Teacher updated successfully'
        })
    }
})

// @desc Admin updating teacher profile
// @route UPDATE /api/v1/teachers/:teacherID/admin
// @access Private Admin Only
exports.adminUpdateTeacher = AsyncHandler(async(req, res) => {
    const { program, classLevel, academicYear, subject } = req.body
    // check if teacher exists
    const teacherFound = await Teacher.findById(req.params.teacherID)
    if (!teacherFound) throw new Error('Teacher not found')

    // check if teacher is withdrawn
    if (teacherFound.isWithdrawn) throw new Error('Action denied, teacher is already withdrawn')

    // assign a program
    if (program) {
        teacherFound.program = program
        await teacherFound.save()
    }

    // assign class level
    if (classLevel){
        teacherFound.classLevel = classLevel
        await teacherFound.save()
    }

    // assign academic year
    if (academicYear){
        teacherFound.academicYear = program
        await teacherFound.save()
    }

    // assign subject
    if (subject){
        teacherFound.subject = subject
        await teacherFound.save()
    } 

    if (program || classLevel || academicYear || subject) res.status(200).json({
        status: 'success',
        data: teacherFound, 
        message: 'Teacher updated by admin successfully'
    })
})