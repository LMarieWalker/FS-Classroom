var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));



app.set('view engine', 'ejs');

app.get('/', function(req, res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    let people = JSON.parse(data);
    res.render('index', {index: people});
  });
});

app.get('/classroom', function(req, res){
  fs.readFile('./classrooms.json', 'utf8', function(err, data){
    let classes = JSON.parse(data);
    res.render('classroom', {classroom: classes});
  });
});

app.post('/classroom', function(req, res){
  fs.readFile('./classroom.json', 'utf8', function(err, dataPost){
    if(err) throw err;
    let student = JSON.parse(dataPost);

    student.push(req.body);

    fs.writeFile('./classroom.json', JSON.stringify(student), function(err){
      if(err) throw err;

      res.redirect('/classroom');
    });
  });
});


// START: FORM EDIT EJS

app.get('/login', function(req, res){
  fs.readFile('./storage.json', 'utf8', function(err, dataGet){
    let person = JSON.parse(dataGet);
    res.render('login', {login: person});
  });
});

// END: FORM EDIT EJS





app.listen(port, function () {
  console.log("running on localhost:"+port);
});
