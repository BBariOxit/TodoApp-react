import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button 
                onClick={onDelete} 
                className="delete-button"
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem;
