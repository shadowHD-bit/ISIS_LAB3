const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')

router.use('/book', bookRouter)

module.exports = router