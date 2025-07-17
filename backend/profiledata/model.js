const mongoose = require("mongoose")
const { stringify } = require("querystring")

mongoose.connect('mongodb+srv://Himank:Himank123@cluster-0.tbaskcb.mongodb.net/legalease')

const ProfileDataSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    experience: {type: String, required: true},
    aboutme: {type: String, required: true},
    location: {type: String, required: true},
    caseType: {type: String, required: true}
})

module.exports = mongoose.model('ProfileData', ProfileDataSchema)