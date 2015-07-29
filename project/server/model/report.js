var mongoose = require('mongoose')

var ReportSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now()
    },
    jsonString: String,
    userId: Number
})

ReportSchema.statics = {
    fetchByUserId: function (cb, _userId) {
        return this.find({userId: _userId}).sort('createAt').exec(cb)
    }
}

module.exports = mongoose.model('Report', ReportSchema)