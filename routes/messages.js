var express = require('express');
var router = express.Router();
var token = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');


router.get('/', function(req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function(err, docs){
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


//perform authentication check
router.use('/', function(req, res, next) {
    token.verify(req.query.token, 'secret hashing key', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not authorized!',
                error: err
            });
        }
        next();
    });
});


router.post('/', function(req, res, next) {
    var decoded = token.decode(req.query.token);
    User.findById(decoded.user._id, function(err, doc){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: doc
        });
        message.save(function(err, result){
            if(err){
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            doc.messages.push(result);
            doc.save();

            res.status(201).json({
                message: 'A message has been saved',
                obj: result
            });
        })
    });
});   

router.patch('/:id', function(req, res, next) {
    var decoded = token.decode(req.query.token);

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
        if(msg.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authorized!',
                error: {message: 'The message was created by another user!'}
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

 
router.delete('/:id', function(req, res, next){
    var decoded = token.decode(req.query.token);
    
    Message.findById(req.params.id, function(err, msg){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!msg){
            return res.status(404).json({
                title: 'Not found!',
                error: {message: 'The message was not found!'}
            });
        }
        if(msg.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authorized!',
                error: {message: 'The message was created by another user!'}
            });
        }
        
        msg.remove(function(err, result){
            if(err){
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                title: 'Document has been removed'
            });
        });
    })
    // Message.findByIdAndRemove(req.params.id, function(err){
        
    //     res.status(200).json({
    //         title: 'Document has been removed'
    //     });
    // })
});
module.exports = router;
