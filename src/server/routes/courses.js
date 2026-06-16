const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseControllers');
const getAnswer = require('../controllers/answersController');

router.route('/')
  .get(controller.getAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.getById)
  .patch(controller.update)
  .delete(controller.remove)

router.post('/:courseId/ask',getAnswer);

module.exports = router;