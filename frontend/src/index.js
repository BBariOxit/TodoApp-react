import React from 'react';
import { createRoot } from 'react-dom/client';
import TodoList from './components/TodoList';
import './styles/main.css';

// Lấy div#root
const rootElement = document.getElementById('root');

// Tạo React root
const root = createRoot(rootElement);

// Render app
root.render(
    <React.StrictMode>
        <TodoList />
    </React.StrictMode>
);