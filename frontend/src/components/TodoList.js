import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API_URL = 'http://localhost:5000/api/todos';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load todos from MongoDB
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setError('Could not load todos. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (text) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });
            
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            
            const newTodo = await response.json();
            setTodos([newTodo, ...todos]);
        } catch (error) {
            console.error('Error adding todo:', error);
            setError('Could not add todo. Please try again.');
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH'
            });
            
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            
            const updatedTodo = await response.json();
            setTodos(todos.map(todo =>
                todo._id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error('Error toggling todo:', error);
            setError('Could not update todo. Please try again.');
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Could not delete todo. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="todo-container">
                <div className="loading">Loading todos...</div>
            </div>
        );
    }

    return (
        <div className="todo-container">
            <h1>📝 My Todo List (MongoDB + Docker)</h1>
            
            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}
            
            <TodoForm onAdd={addTodo} />
            
            <div className="todo-list">
                {todos.length === 0 ? (
                    <p className="empty-message">No todos yet. Add one above!</p>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onToggle={() => toggleTodo(todo._id)}
                            onDelete={() => deleteTodo(todo._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;
