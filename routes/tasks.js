var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('in get tasks route');
    pool.connect(function(error, client, done) {
        if(error){
            console.log('pool connection', error);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks;', function(qError, resObj) {
                done();
                // var resultObj
                // queryError any error that happens in executing the query
                // resultObj response object from db via pg contains the result set
                if(qError){
                    console.log('querry error', qError);
                    res.sendStatus(500);
                }else{
                    // resultObj.rows contains the result set as an array of objects
                    console.log('resObj.rows ->', resObj.rows);
                    res.send(resObj.rows);
                }  
            });
        }
    });
});

module.exports = router;
