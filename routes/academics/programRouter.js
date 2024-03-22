const express = require('express');
const { createProgram, getPrograms, getProgram, updateProgram, deleteProgram } = require('../../controller/academics/programsCtrl');
const isAdmin = require('../../middleware/isAdmin');
const isLogin = require('../../middleware/isLogin');

const programRouter = express.Router();

programRouter
    .route('/')
    .post(isLogin, isAdmin, createProgram)
    .get(isLogin, isAdmin, getPrograms)

programRouter
    .route('/:id')
    .get(isLogin, isAdmin, getProgram)
    .put(isLogin, isAdmin, updateProgram)
    .delete(isLogin, isAdmin, deleteProgram)

module.exports = programRouter;