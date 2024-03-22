const express = require('express');
const { createAcademicTerm, getAcademicTerms, getAcademicTerm, updateAcademicTerms, deleteAcademicTerms } = require('../../controller/academics/academicTermCtrl');
const isAdmin = require('../../middleware/isAdmin');
const isLogin = require('../../middleware/isLogin');

const academicTermRouter = express.Router();

academicTermRouter
    .route('/')
    .post(isLogin, isAdmin, createAcademicTerm)
    .get(isLogin, isAdmin, getAcademicTerms)

academicTermRouter
    .route('/:id')
    .get(isLogin, isAdmin, getAcademicTerm)
    .put(isLogin, isAdmin, updateAcademicTerms)
    .delete(isLogin, isAdmin, deleteAcademicTerms)

module.exports = academicTermRouter;