const express = require('express');
const router = express.Router();

const Confession = require('../models/confessions');

//retrieving confessions
router.get('/confessions', (req, res, next)=>{
    Confession.find(function(err, confessions){
        res.json(confessions);
    })
    next();
});

//setting accepted status
router.get('/confessions', (req, res, next)=>{
    res.status(202);
});

//retrieving specific confession
router.get('/confession/:id', (req, res, next)=>{
    Confession.find({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

//add confession
router.post('/confession',function(req, res, next) {
    let newConfession = new Confession({
        confession: req.body.confession
    });

    newConfession.save(function (err, confession){
        if(err){
            res.json({msg: 'Failed to add confession'});
        }
        else{
            res.json({msg: 'Confession added successfully!'});
        }
    })
});

//delete confession
router.delete('/confession/:id',(req, res, next)=>{
    Confession.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;