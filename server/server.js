const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
// var {ObjectId} = require('mongoose');
var Object = require('mongoose');

var mongoose = require('./db/mongooes');

var Todo = require('./model/todo');
var User = require('./model/users');

var app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/todos',(req, res) =>{
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })

});


app.get('/todos', (req, res) => {
   Todo.find().then((todos)=>{
     res.send({todos});
   },(e) => {
     res.status(400).send(e);
   })
});

app.get('/todos/:id', (req, res) => {

  var id = req.params.id;

  if(!Object.Types.ObjectId.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id, function (err, todo) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send({todo});
  });

});

app.delete('/todos/:id', (req, res) =>{
   var id = req.params.id;

   if(!Object.Types.ObjectId.isValid(id)){
    return res.status(404).send();
   }

   Todo.findByIdAndDelete(id).then((doc) => {
      if(!doc){
        res.status(404).send();
      }
      res.send(doc);
   }).catch((e) => {
    res.status(400).send();
   });

});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!Object.Types.ObjectId.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){

    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
    if(!todo){
      res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })

});


//users

app.post('/users', (req, res) => {
    body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    // user.save().then((user) =>{
    //  res.send(user);
    // }).catch((e)=>{
    //   res.status(400).send(e);
    // });
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })

});


// app.post('/todos',(req, res) =>{
//   var todo = new Todo({
//     text: req.body.text
//   })

//   todo.save().then((doc) => {
//     res.send(doc);
//   },(e)=>{
//     res.status(400).send(e);
//   })

// });


app.listen(port, () => {
  console.log(`started on port ${port}`);
});
