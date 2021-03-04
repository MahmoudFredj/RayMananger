const mongoose = require('mongoose');
const Joi = require('joi');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    finished: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    startDate: Date,
    expectedEndDate: Date,
    acutalEndDate: Date,
});


const validationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(1024).required(),
});

const validate = (project) => validationSchema.validate(project);
const Project = mongoose.model('project', projectSchema);