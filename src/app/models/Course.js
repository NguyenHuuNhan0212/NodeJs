const mongoose = require('mongoose')
// plugin của mongodb khá quan trọng
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type: Number,},
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    level: { type: String, maxLength: 255 },
    slug: {type: String, slug: 'name', unique: true},
}, {
    _id: false,
    timestamps: true,
});


// custom =query helper
CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType =  ['asc', 'desc'].includes(req.query.type) 
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this
}
// Add plugin
mongoose.plugin(slug)

CourseSchema.plugin(AutoIncrement)
CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Course', CourseSchema);
