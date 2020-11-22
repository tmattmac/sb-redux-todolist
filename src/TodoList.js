import React, { useEffect, useState } from 'react';
import './TodoList.css';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { v4 as uuid } from 'uuid';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos') || '[]';
        setTodos(JSON.parse(storedTodos));
    }, []);

    useEffect(() => {
        const todosString = JSON.stringify(todos);
        localStorage.setItem("todos", todosString);
    }, [todos]);

    const addTodo = ({ text }) => {
        const defaults = {
            completed: false,
            id: uuid()
        };
        console.log({ text, ...defaults });
        setTodos(todos => [...todos, { text, ...defaults }]);
    }

    const updateTodo = (id, { text, completed }) => {
        setTodos(todos => {
            const todosCopy = [...todos];
            const idx = todosCopy.findIndex(todo => todo.id === id);
            todosCopy.splice(idx, 1, { id, text, completed });
            return todosCopy;
        });
    }

    const removeTodo = id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="TodoList">
            <NewTodoForm addTodo={addTodo} />
            <h1>Your Todo List</h1>
            <div className="TodoList-todos">
                {todos.map(({ id, text, completed }) => (
                    <Todo
                        key={id}
                        update={todo => updateTodo(id, todo)}
                        remove={() => removeTodo(id)}
                        text={text}
                        completed={completed}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
