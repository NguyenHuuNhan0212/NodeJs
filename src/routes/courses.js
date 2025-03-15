const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create',courseController.create)
router.post('/store',courseController.store)
router.get('/:slug',courseController.show)
router.post('/handle-form-actions', courseController.handleFormAction)
router.post('/handle-form-trash', courseController.handleFormTrash)
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id', courseController.destroy)
router.delete('/:id/force', courseController.forceDestroy)

module.exports = router;
