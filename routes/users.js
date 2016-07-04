var express = require('express');
var router = express.Router();
var hasher = require('password-hash');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    Message.find().exec(function(err, docs){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'success',
            obj: docs
        });
    });
});

router.patch('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, msg){

        if(err){
            return res.status(404).json({
                title: 'An error occurred!',
                error: err
            });
        }
        if(!msg){
            return res.status(404).json({
                title: 'Not found!',
                error: {message: 'The message was not found!'}
            });
        }
        msg.content = req.body.content;

        msg.save(function(err, result){
            if(err){
                return res.status(404).json({
                    title: 'Not found!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Message saved successfully',
                obj: result
            })
        })
        
    })
});


router.post('/', function(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hasher.generate(req.body.password) 
    });
    user.save(function(err, result){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'The user has been saved',
            obj: result
        });
    })
});
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, doc){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!doc){
            return res.status(404).json({
                title: 'Not found!',
                error: {message: 'The user was not found!'}
            });
        }

        if(!hasher.verify(req.body.password, doc.password)){
            return res.status(404).json({
                title: 'Could not sign you in!',
                error: {message: 'The email or password are incorrect!'}
            });
        }
        var token = jwt.sign({user: doc}, 'secret hashing key', {expiresIn: 7200});
        res.status(200).json({
            message: 'Success!',
            token: token,
            userId: doc._id
        });
    })
});
router.delete('/:id', function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            title: 'Document has been removed'
        });
    })
});
module.exports = router;