const Todo = require('../models/Todo');

module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user)
    try {
      const todoItems = await Todo.find({ userId: req.user.id }); 
      const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false });
      res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user });
    } catch (err) {
      console.error(err) 
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({ todo: req.body.todoItem, completed: false, userId: req.user.id }); 
      console.log('Todo has been added!');
      res.redirect('/todos');
    } catch (err) {
      console.error(err); 
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: true
      })
      console.log('Marked Complete!');
      res.json('Marked Complete!');
    } catch (err) {
      console.error(err); 
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        completed: false
      })
      console.log('Marked Complete!');
      res.json('Marked Complete!');
    } catch (err) {
      console.error(err); 
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoFromJSFile }); 
      console.log('Deleted Todo');
      res.json('Deleted Todo');
    } catch (err) {
      console.error(err); 
    }
  }
}
