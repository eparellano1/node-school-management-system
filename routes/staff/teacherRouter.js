const express = require('express');
const { adminRegisterTeacher, loginTeacher, getAllTeachersByAdmin, getTeacherByAdmin, getTeacherProfile, teacherUpdateProfile, adminUpdateTeacher } = require('../../controller/staff/teacherCtrl');
const isAdmin = require('../../middleware/isAdmin');
const isLogin = require('../../middleware/isLogin');
const isTeacher = require('../../middleware/isTeacher')
const isTeacherLogin = require('../../middleware/isTeacherLogin')

const teacherRouter = express.Router()

teacherRouter.post('/admin/register', isLogin, isAdmin, adminRegisterTeacher)
teacherRouter.post('/login', loginTeacher)
teacherRouter.get('/admin', isLogin, isAdmin, getAllTeachersByAdmin)
teacherRouter.get('/profile', isTeacherLogin, isTeacher, getTeacherProfile)
teacherRouter.get('/:teacherID/admin', isLogin, isAdmin, getTeacherByAdmin)
teacherRouter.put('/:teacherID/update', isTeacherLogin, isTeacher, teacherUpdateProfile)
teacherRouter.put('/:teacherID/update/admin', isLogin, isAdmin, adminUpdateTeacher)
module.exports = teacherRouter;