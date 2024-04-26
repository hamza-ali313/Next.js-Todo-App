'use client'
import { useEffect, useState } from 'react';
import { readTodo, deleteTodo, addTodo } from '@/lib/actions';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Call readTodo and await its result
            const todoData = await readTodo();
            if (todoData && todoData.todos) {
                setTodos(todoData.todos);
            } else {
                console.error('Error fetching todos:');
            }
        } catch (error) {
            console.error('Error fetching todos');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (id, isChecked) => {
        const updatedTodos = todos.map(todo =>
            todo._id === id ? { ...todo, isChecked } : todo
        );
        setTodos(updatedTodos);
    };

    const onDeletePress = async (event, id) => {
        try {
            event.preventDefault();
            const data = await deleteTodo(id);
            setTodos(data.todos);
            // console.log(data)
        } catch (error) {
            console.log('Delete todos error:', error);
        }
    };
    const addtodo = async (e) => {
        try {
            e.preventDefault();
            setTodo("")
            const data = await addTodo(todo);
            setTodos(data.todos);
        } catch (error) {
            console.log('todo could not be added:', error);
        }
    };

    return (
        <div>
            <h1 className='text-5xl text-center bg-black text-white font-mono py-4'>Todo List</h1>
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <form className='xl:w-3/6 mx-auto px-4' onSubmit={e => { addtodo(e) }}>
                    <input type='text' required value={todo} onChange={(e) => setTodo(e.target.value)}
                        className='border-2 outline-0 border-green-500 px-5 py-1 rounded my-4 w-full' placeholder='Insert a todo' />
                    <div className='text-center'>
                        <button className='tracking-wide bg-black text-white font-sans px-10 py-1 rounded my-4'>
                            Save
                        </button>
                    </div>
                    {todos.length > 0 ? (
                        <ul className='flex justify-center items-start flex-col w-12/12 p-4 bg-black'>
                            {todos.map((todo) => (
                                <li key={todo._id} className='text-white text-3lg font-mono bg-green-700 my-1 w-full'>
                                    <div className='custom-checkbox relative'>
                                        <input
                                            type="checkbox"
                                            className='w-full h-full top-0 left-0 z-10 opacity-0 absolute'
                                            onChange={(e) => handleCheckboxChange(todo._id, e.target.checked)}
                                        />
                                        <label className='relative w-full h-full inline-block px-3 py-1 font-sans bg-transparent'>
                                            <h2 className='text-white'>{todo.text}</h2>
                                        </label>
                                    </div>
                                    {todo.isChecked && (
                                        <button className='w-full bg-white text-black font-sans'
                                            onClick={(e) => onDeletePress(e, todo._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h2 className='text-black text-3lg font-mono bg-green-700 my-1 w-full'>
                            No todos found
                        </h2>
                    )}
                </form>
            )}
        </div>
    );
};

export default TodoList;
