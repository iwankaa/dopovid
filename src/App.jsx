import React from 'react';
import fetch from 'node-fetch';
import { useSsrState, useSsrEffect, useRegisterEffect } from '@issr/core';

const getTodos = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(data => data.json())
};

export const App = () => {
    const [todos, setTodos] = useSsrState([]);
    const registerEffect = useRegisterEffect();

    useSsrEffect(() => {
        registerEffect(getTodos).then(todos => {
            setTodos(todos);
        });
    }, []);

    return (
        <div>
            <h1>Hi</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
};