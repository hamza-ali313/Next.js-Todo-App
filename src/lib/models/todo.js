"use server"
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
});

let Todos;
try {
  Todos = mongoose.model('Todos')
} catch (error) {
  Todos = mongoose.model('Todos', TodoSchema)
}

export default Todos;