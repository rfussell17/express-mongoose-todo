const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Todo = require('./models/todo');

mongoose.connect('mongodb://localhost:27017/todoApp', {useNewUrlParser: true})
.then(()=>{
  console.log('mongo connection open')
})
.catch(err =>{
  console.log('mongo connection error')
  console.log(err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log("listening on port 3000");
});