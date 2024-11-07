const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todo');
const { ensureAuth } = require('../middleware/auth');

router.get('/', todosController.getTodos);
router.post('/createTodo', todosController.createTodo);
router.put('/markComplete', todosController.markComplete);
router.put('/markIncomplete', todosController.markIncomplete);
router.delete('/deleteTodo', todosController.deleteTodo);

module.exports = router;
