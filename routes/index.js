router = require('./users')

router.get('/', (req, res, next) => {
	res.render('index', {title : 'Express'})
})

module.exports = router;