var express = require('express');
var router = express.Router();
let User = require('./../models/UserModel')

router.post('/add', (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        status : req.body.status
    })
    newUser.save((err) => {
        if (err) {
            res.json({
                result: 'faild',
                data: {},
                message: `Error is : ${err}`
            })
        } else {
            res.json({
                result: 'ok',
                data: {
                    name: req.body.name,
                    age: req.body.age,
                    status : req.body.status,
                    message: "Insert new user successfully"
                }
            })
        }
    })
});

router.get('/list', (req, res, next) => {
	User.find({}).limit(100).sort({name: 1}).select({
		name : 1,
		age : 1,
		created_date : 1,
		status : 1
	}).exec((err, user) => {
		if(err) {
			res.json({
				result : 'faild',
				data : {},
				message: `Error is : ${err}`
			})
		} else {
			res.json({
				result: 'ok',
				data : user,
				message: 'Query list of User successfully'
			})
		}
	})
})

router.get('/get_by_id', (req, res, next) => {
	User.findById(require('mongoose').Types.ObjectId(req.query.id),
	(err, user) => {
		if(err) {
			res.json({
				result : 'faild',
				data : {},
				message : `Error is : ${err}`
			})
		} else {
			res.json({
				result: 'ok',
				data : user,
				message : 'Query successfully'
			})
		}
	})
})

router.get('/get_condition', (req, res, next) => {
	let condition = {
		name : new RegExp(req.query.name, 'i')
	}
	const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 100
	User.find(condition).limit(limit).sort({name: 1}).select({
		name : 1,
		age: 1,
		status : 1
	}).exec((err, user) => {
		if(err) {
			res.json({
				result : 'faild',
				data : {},
				message : `Error is : ${err}`
			})
		} else {
			res.json({
				result: 'ok',
				data : user,
				message : 'Query successfully'
			})
		}
	})
})

module.exports = router;