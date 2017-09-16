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
});

router.put('/done/:id', function(req, res) {
    console.log('in PUT done, req.params = ', req.params);
    pool.connect(function(err, client, done){
        if(err) {
            console.log('connection error', err);
            res.sendStatus(500);
        } else {
            client.query('UPDATE tasks SET is_complete=TRUE WHERE id=$1;', [req.params.id], function(qError, result){
                done();
                if(qError) {
                    console.log('query error', qError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});

router.put('/undone/:id', function(req, res) {
    console.log('in PUT undone req.params = ', req.params);
    pool.connect(function(err, client, done){
        if(err) {
            console.log('connection error', err);
            res.sendStatus(500);
        } else {
            var updateQuery = 'UPDATE tasks SET is_complete=FALSE WHERE id=$1;';
            client.query(updateQuery, [req.params.id], function(qError, result){
                done();
                if(qError) {
                    console.log('query error', qError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    console.log('in DELETE req.params = ', req.params.id);
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('connectg error');
            res.sendStatus(500);
        } else {
            var deleteRow = 'DELETE FROM tasks WHERE id=$1';
            client.query(deleteRow,[req.params.id], function(qError, result) {
                done();
                if (qError) {
                    console.log('query error', qError);
                    res.sendStatus(500);                    
                } else {
                    res.sendStatus(205);
                }
            })
        }
    })
})

module.exports = router;
