const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // GET /course/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', {course: mongooseToObject(course)})
            })
            .catch(next)
      
    }
    // GET /courses/create
    create(req, res, next){
       res.render('courses/create')
      
    }
    //POST /courses/store
    store(req, res, next){
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEmCMQBEG5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLCa7KMcmhKIoqYKn8qyKPLC3mgm8A`
        const course = new Course( req.body)
            course
                .save()
                .then(() => {
                     res.redirect(`/me/stored/courses`)
                })
                .catch(next)
     }
     //Get /courses/:id/edit
     edit(req, res, next){
        Course.findById(req.params.id)
            .then((course )=> res.render('courses/edit', {course: mongooseToObject(course)}))
            .catch(next)
       
     }
     // PUT /courses/:id
     update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
     }
     // DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
     }
      // DELETE /courses/:id/force
      forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
      }
     //PATCH /course/:id/restore
    restore(req, res, next){
            Course.restore({_id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next)
    }
    //POST /course/handle-form-action
    handleFormAction(req, res, next){
       switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is invalid'})
       }
    }
    handleFormTrash(req, res, next){
        switch(req.body.action){
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default: 
                res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new CourseController();
