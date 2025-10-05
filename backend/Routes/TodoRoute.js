const router = require('express').Router()
const {userVerification} = require('../Middlewares/AuthMiddleware.js');
const {addTodo, getTodos, deleteTodo, toggleDone} = require("../Controllers/TodoControllers.js");

router.post("/add", userVerification, addTodo);
router.get("/", userVerification, getTodos);
router.delete("/:id", userVerification, deleteTodo);
router.put("/:id", userVerification, toggleDone);


module.exports = router;