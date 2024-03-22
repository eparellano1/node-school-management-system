const express = require('express');
const { 
    registerAdminCtrl, 
    loginAdminCtrl, 
    getAdminsCtrl, 
    getAdminProfileCtrl, 
    updateAdminCtrl, 
    deleteAdminCtrl, 
    adminSuspendTeacherCtrl, 
    adminUnsuspendTeacherCtrl, 
    adminWithdrawTeacherCtrl, 
    adminUnwithdrawTeacherCtrl,  
    adminPublishResultsCtrl,
    adminUnpublishResultsCtrl
} = require('../../controller/staff/adminCtrl');

const isLogin = require('../../middleware/isLogin');
const isAdmin = require('../../middleware/isAdmin');
const adminRouter = express.Router();

// register admin
adminRouter.post('/register', registerAdminCtrl)

// login
adminRouter.post('/login', loginAdminCtrl)

// get all
adminRouter.get('/', isLogin, getAdminsCtrl)

// get single
adminRouter.get('/profile', isLogin, isAdmin, getAdminProfileCtrl)

// update
adminRouter.put('/', isLogin, isAdmin, updateAdminCtrl)

// delete admin
adminRouter.delete('/:id', deleteAdminCtrl)

// suspend
adminRouter.put('/suspend/teacher/:id', adminSuspendTeacherCtrl)

// unsuspend
adminRouter.put('/unsuspend/teacher/:id', adminUnsuspendTeacherCtrl)

// withdraw teacher
adminRouter.put('/withdraw/teacher/:id', adminWithdrawTeacherCtrl)

// unwithdraw teacher 
adminRouter.put('/unwithdraw/teacher/:id', adminUnwithdrawTeacherCtrl)

// publish exam 
adminRouter.put('/publish/exam/:id', adminPublishResultsCtrl)

// unpublish exam
adminRouter.put('/unpublish/exam/:id', adminUnpublishResultsCtrl)

// unpublish exam 
module.exports = adminRouter