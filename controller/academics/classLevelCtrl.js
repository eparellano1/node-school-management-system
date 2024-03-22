const AsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');
const ClassLevel = require('../../model/Academic/ClassLevel');

// @desc Create class level
// @route POST /api/v1/class-levels
// @access Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body
    // check if exists
    const classFound = await ClassLevel.findOne({ name })
    if (classFound) throw new Error('Class already exists')

    // create
    const classCreated = await ClassLevel.create({ 
        name,
        description,
        createdBy: req.userAuth._id
    })

    // push academic term into admin
    const admin = await Admin.findById(req.userAuth._id)
    admin.classLevels.push(classCreated._id)
    // save
    await admin.save()

    res.status(201).json({
        status: 'success',
        message: 'Class created successfully',
        data: classCreated
    })
})

// @desc Get all class levels
// @route GET /api/v1/class-levels
// @access Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const classes = await ClassLevel.find()

    res.status(201).json({
        status: 'success',
        message: 'Class Levels fetched successfully',
        data: classes
    })
})

// @desc Get single class level
// @route GET /api/v1/class-levels/:id
// @access Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id)

    res.status(201).json({ 
        status: 'success',
        message: 'Class fetched successfully',
        data: classLevel
    })
})

// @desc Update clas level
// @route PUT /api/v1/class-levels/:id
// @access Private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body
    // check if name exists
    const classFound = await ClassLevel.findOne({ name })
    if (classFound) throw new Error('Class already exists')

    const classLevel = await ClassLevel.findByIdAndUpdate(req.params.id, { 
        name, 
        description,
        createdBy: req.userAuth._id
    }, {
        new: true
    })

    res.status(201).json({
        status: 'success',
        message: 'Class level updated successfully',
        data: classLevel
    })
})

// @desc Delete class level
// @route DEL /api/v1/class-level/:id
// @access Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    await ClassLevel.findByIdAndDelete(req.params.id)

    res.status(201).json({
        status: 'success',
        message: 'Class level deleted successfully',
    }) 
})