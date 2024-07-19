"use server"
import connectToDb from "./utils";
import Todo from "./models/todo";

const readTodo = async () => {
  try {
    await connectToDb();
    const todos = await Todo.find();
    return { todos: todos };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Error fetching data' };
  }
};

const deleteTodo = async (id) => {
  try {
    await connectToDb();
     await Todo.findByIdAndDelete(id);
     const todos = await Todo.find();
    return { todos: todos };
  } catch (error) {
    console.error('Error deleting todo :', error);
    return { error: 'Error deleting todo' };
  }
};


const addTodo = async (text) => {
  try {
      await connectToDb();
      const newTodo = new Todo({ text });
      await newTodo.save();
      const todos = await Todo.find();
      return { todos };
  } catch (error) {
      console.error('Error adding todo:', error);
      return { error: 'Error adding todo' };
  }
};

export { readTodo, deleteTodo, addTodo };

