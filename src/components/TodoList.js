import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { loadTodos, saveTodos } from '../utils/storage';

function TodoList() {
    const [todos, setTodos] = useState([]);

    // Load todos from localStorage when component mounts
    useEffect(() => {
        setTodos(loadTodos());
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-container">
            <h1>📝 My Todo List</h1>
            <TodoForm onAdd={addTodo} />
            <div className="todo-list">
                {todos.length === 0 ? (
                    <p className="empty-message">No todos yet. Add one above!</p>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;
