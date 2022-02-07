const express = require('express')
const router = express.Router()
const ctrlPages = require('../controllers/pages')

//routes would go in this section here

//route to render the page
router.get('/', ctrlPages.mainPage)

router.get('/pageTwo', ctrlPages.pageTwo)

router.get('/pageThree', ctrlPages.pageThree)

module.exports = router