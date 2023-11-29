const express = require('express')
const router = express.Router();

const {localfileupload, imageUpload, videoUpload, imagecompressor} = require('../controllers/fileupload')

router.post("/localfileupload", localfileupload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imagecompressor", imagecompressor)

module.exports = router  