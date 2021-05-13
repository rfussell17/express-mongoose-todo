const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const method = require('method-override');

const Todo = require('./models/todo');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
.then(()=>{
  console.log('mongo connection open')
})
.catch(err =>{
  console.log('mongo connection error')
  console.log(err)
})
