const express = require("express");
const controller = require("../controllers/documentControllers.js");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware.js")

router.route("/:course_id/documents")
.get(controller.getAll)
.post(upload.single('file'),controller.create)


router.route("/:course_id/documents/:id")
.get(controller.getById)
.delete(controller.remove)
.patch(controller.update)

module.exports = router;