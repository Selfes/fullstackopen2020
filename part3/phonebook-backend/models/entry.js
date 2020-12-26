const mongoose = require("mongoose")

// add unique validator
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB database')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => console.log('connected to MongoDB'))
        .catch((error) => console.log('error connecting to MongoDB:', error.message))

const phonebookEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    }
})

phonebookEntrySchema.plugin(uniqueValidator)

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("PhonebookEntry", phonebookEntrySchema)
