var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

app.listen(3000, function() {
    console.log('listening on 3000');
});