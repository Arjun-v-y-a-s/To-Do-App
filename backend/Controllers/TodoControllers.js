const Todo = require("../Models/TodoModel.js");

//  Add new Todo
module.exports.addTodo = async (req, res) => {
    try {
        const { title, description, deadline, priority } = req.body;


        const authorId = req.user._id;
        const newTodo = new Todo({ title, description, deadline, priority, author: authorId });


        await newTodo.save();
        res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    } catch (err) {
        console.error("Error adding todo:", err);
        res.status(500).json({ message: "Error adding todo", error: err.message });
    }
};

module.exports.getTodos = async (req, res) => {
    try {
        // req.user._id se filter karo
        const todos = await Todo.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ todos });
    } catch (err) {
        res.status(500).json({ message: "Error fetching todos", error: err.message });
    }
};


module.exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        if (todo.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this todo" });
        }

        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
};


//  Toggle isDone
module.exports.toggleDone = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) return res.status(404).json({ message: "Todo not found" });

        if (todo.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this todo" });
        }

        todo.isDone = !todo.isDone;
        await todo.save();

        res.status(200).json({ message: "Todo status updated", isDone: todo.isDone });
    } catch (err) {
        res.status(500).json({ message: "Error updating todo", error: err.message });
    }
};



