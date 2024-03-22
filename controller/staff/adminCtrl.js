const AsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Admin = require('../../model/Staff/Admin');
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');
const { hashPassword, isPassMatched } = require('../../utils/helpers');


// @desc Register admin
// @route POST /api/v1/admins/register
// @access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // Check if email exists
    const adminFound = await Admin.findOne({ email });
    if (adminFound) throw new Error("Admin exists");
    
    // register
    const user = await Admin.create({
      name,
      email,
      password: await hashPassword(password),
    });
    res.status(201).json({
      status: "success",
      data: user,
      message: "Admin registered successfully"
    });
})
 
// @desc Login admin
// @route POST /api/v1/admins/login
// @access Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find User
    const user = await Admin.findOne({ email });
    if (!user) return res.json({ message: "Invalid login credentials" });

    // verify password
    const isMatched = await isPassMatched(password, user.password)

    if (!isMatched) return res.json({ message: "Invalid login credentials" });
    else {
        return res.json({ 
        data: generateToken(user._id),
        message: "Admin logged in successfully" 
    });   
    } 
}) 

// @desc Get all admins
// @route POST /api/v1/admins/
// @access Private
exports.getAdminsCtrl = AsyncHandler(async (req, res) => {
    const admins = await Admin.find()
    res.status(200).json({
        status: 'success',
        message: 'Admin fetched successfully',
        data: admins
    })
})

// @desc Get single admin
// @route POST /api/v1/admins/:id
// @access Private
exports.getAdminProfileCtrl = AsyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt").populate("academicYears")
    if (!admin) throw new Error("Admin not found")
    else res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin Profile fetched successfully"
    })
})

// @desc Update admin
// @route UPDATE /api/v1/admins/:id
// @access Private
exports.updateAdminCtrl = AsyncHandler(async(req, res) => {
    const { email, name, password } = req.body
    // if email is taken
    const emailExists = await Admin.findOne({ email })
    if (emailExists) throw new Error('This email is taken/exists')

    // check if user is updating password
    if (password){
        // update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, { 
            email,
            password: await hashPassword(password),
            name 
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: admin, 
            message: 'Admin updated successfully'
        })
    } else {
        // update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, { 
            email,
            name 
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: admin, 
            message: 'Admin updated successfully'
        })
    }
})

// @desc Delete admin
// @route DELETE /api/v1/admins/:id
// @access Private
exports.deleteAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Delete admin'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin suspend teacher
// @route PUT /api/v1/admins/suspend/teacher/:id
// @access Private
exports.adminSuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin suspend teacher'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin unsuspend teacher
// @route PUT /api/v1/admins/suspend/teacher/:id
// @access Private
exports.adminUnsuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin unsuspending teacher'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin withdraw teacher
// @route PUT /api/v1/admins/withdraw/teacher/:id
// @access Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin withdraw teacher'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin unwithdraw teacher
// @route PUT /api/v1/admins/unwithdraw/teacher/:id
// @access Private
exports.adminUnwithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin unwithdraw teacher'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin publish exam results
// @route PUT /api/v1/admins/publish/exam/:id
// @access Private
exports.adminPublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin publish exam'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}

// @desc Admin unpublish exam results
// @route PUT /api/v1/admins/unpublish/exam/:id
// @access Private
exports.adminUnpublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin unpublish exam'
        })
    } catch (error) {
        res.json({ 
            status: 'failed',
            error: error.message
        })
    }
}