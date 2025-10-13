import React from 'react';

function TodoItem({ todo, onToggle, onDelete, isExiting }) {
    return (
        <div
            className={`todo-item ${todo.completed ? 'completed' : ''} ${isExiting ? 'exit' : 'enter'}`}
            role="listitem"
            aria-checked={todo.completed}
        >
            <label className="todo-checkbox-wrap" aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                    className="todo-checkbox"
                />
                <span className="checkbox-visual" aria-hidden="true"></span>
            </label>
            <span className="todo-text">{todo.text}</span>
            <button 
                onClick={onDelete}
                className="delete-button"
                aria-label={`Delete todo: ${todo.text}`}
                title="Delete"
            >
                ✕
            </button>
        </div>
    );
}

export default TodoItem;
