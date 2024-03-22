const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
expressAsyncHandler

// @desc Create exam
// @route POST /api/v1/exam
// @access Private Teachers only
exports.createExam = AsyncHandler(async(req, res) => {
    const { 
        name, 
        description, 
        subject, 
        program, 
        passMark, 
        academicTerm, 
        duration, 
        examDate, 
        examTime, 
        examType, 
        academicYear 
    } = req.body
})
