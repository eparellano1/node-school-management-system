const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const Subject = require('../../model/Academic/Subject');
const Program = require('../../model/Academic/Program');
const YearGroup = require('../../model/Academic/YearGroup');

// @desc Create year groups
// @route POST /api/v1/year-groups/
// @access Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body

    // check if program exists 
    const yearGroupFound = await YearGroup.findOne({ name })
    if (yearGroupFound) throw new Error('Year Group/Graduation already exists')

    // create year group
    const yearGroupCreated = await YearGroup.create({ 
        name,
        academicYear,
        createdBy: req.userAuth._id
    })

    // find admin
    const admin = await Admin.findById(req.userAuth._id)
    if(!admin) throw new Error('Admin not found')

    // push yeargroup to admin
    admin.yearGroups.push(yearGroupCreated._id)
    await admin.save()

    res.status(201).json({
        status: 'success',
        message: 'Year group created successfully',
        data: yearGroupCreated
    })
})

// @desc Get all year groups
// @route GET /api/v1/year-groups
// @access Private
exports.getYearGroups  = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.find()

    res.status(201).json({
        status: 'success',
        message: 'Year groups fetched successfully',
        data: yearGroups
    })
})

// @desc Get single year group
// @route GET /api/v1/year-groups/:id
// @access Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id)

    res.status(201).json({ 
        status: 'success',
        message: 'Year group fetched successfully',
        data: yearGroup
    })
})

// @desc Update year group
// @route PUT /api/v1/year-groups/:id
// @access Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body
    // check if year group exists
    const yearGroupFound = await YearGroup.findOne({ name })
    if (yearGroupFound) throw new Error('Year group already exists')

    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id, { 
        name, 
        academicYear,
        createdBy: req.userAuth._id
    }, {
        new: true
    })

    res.status(201).json({
        status: 'success',
        message: 'yearGroup updated successfully',
        data: yearGroup
    })
})

// @desc Delete year group
// @route DEL /api/v1/year-groups/:id
// @access Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    await YearGroup.findByIdAndDelete(req.params.id)

    res.status(201).json({
        status: 'success',
        message: 'Year group deleted successfully',
    }) 
})