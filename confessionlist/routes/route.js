const express = require('express');
const router = express.Router();

const Confession = require('../models/confessions');
const { update } = require('../models/confessions');

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
    Confession.findOne({_id: req.params.id}, function(err, result){
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
        submission: req.body.submission
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

//update confession
router.put('/update/:id',function(req,res){
    var id = req.params.id;
    Confession.findOne({_id: id},function(err, foundObject){
        if (err){
            console.log(err);
            res.status(500).send();
        }
        else{
            if(!foundObject){
                res.status(404).send();
            }
            else{
                if(req.body.reportCount){
                    foundObject.reportCount = req.body.reportCount;
                }

                foundObject.save(function(err, updatedObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }
                    else{
                        res.send(updatedObject);
                    }
                });
            }
        }
    });
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