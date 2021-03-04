const mongoose = require('mongoose');
const Joi = require('joi');

const ticketSchema = mongoose.Schema({
    name: String,
    description: String,
    finished: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    startDate: Date,
    expectedEndDate: Date,
    actualEndDate: Date
});

const validationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(1024).required()
});

const validate = (ticket) => validationSchema.validate(ticket);
const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = {
    Ticket,
    validate
}