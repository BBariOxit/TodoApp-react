import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API_URL = 'http://localhost:5000/api/todos';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exitingIds, setExitingIds] = useState(new Set());

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
        // Add a small exit animation before removing the item
        const ANIM_MS = 350;
        setExitingIds(prev => new Set(prev).add(id));
        try {
            // Wait for animation to play
            await new Promise((resolve) => setTimeout(resolve, ANIM_MS));

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            
            setTodos(prev => prev.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Could not delete todo. Please try again.');
        } finally {
            setExitingIds(prev => {
                const copy = new Set(prev);
                copy.delete(id);
                return copy;
            });
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
            <h1 className="app-title">📝 My Todo List</h1>
            
            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}
            
            <TodoForm onAdd={addTodo} />
            
            <div className="todo-list">
                {todos.length === 0 ? (
                    <div className="empty-message">
                        <div className="empty-illustration" aria-hidden="true"></div>
                        <p>No todos yet. Add one above!</p>
                    </div>
                ) : (
                    todos.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onToggle={() => toggleTodo(todo._id)}
                            onDelete={() => deleteTodo(todo._id)}
                            isExiting={exitingIds.has(todo._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;
