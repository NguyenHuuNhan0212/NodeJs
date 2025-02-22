const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    //GET /news
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                // chú ý chỗ này do handlebar có vấn để bảo mật nên cần như vậy mới truy xuất dữ liệu
               res.render('home', {
                    courses: multipleMongooseToObject(courses)
            })
            })
            .catch(next)
    }
    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
