const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Todo = require("./models/todo");

mongoose
  .connect("mongodb://localhost:27017/todoApp", { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("mongo connection error");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  console.log(todos);
  res.render("todos/index", { todos });
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.redirect(`/todos`);
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  console.log(todo);
  res.render("todos/details", { todo });
});

app.get("/todos/:id/edit", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/edit", { todo });
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/todos/${todo._id}`);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
