var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('in get tasks route');
    pool.connect( function (err, client, done) {
        if (err){
            console.log('pool connection', err);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks;', function(qError, resObj) {
                done();
                if(qError){
                    console.log('querry error', qError);
                    res.sendStatus(500);
                }else{
                    console.log('resObj.rows ->', resObj.rows);
                    res.send(resObj.rows);
                }  
            });
        }
    });
});

router.post('/', function(req, res) {
    var taskIn = req.body.task
    console.log('in tasks post with req.body.task:', req.body.task);
    pool.connect( function (err, client, done) {
        if (err) {
            console.log('pool connect', err);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO tasks (task) VALUES ($1)', [taskIn], function (qErr, resObj) {
                done();
                if (qErr) {
                    console.log('querry error');
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

module.exports = router;
