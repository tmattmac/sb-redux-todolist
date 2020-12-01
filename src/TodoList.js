import React, { useEffect } from 'react';
import './TodoList.css';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { useDispatch, useSelector } from 'react-redux';

function TodoList() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos') || '[]';
        dispatch({
            type: 'LOAD_TODOS',
            payload: {
                todos: JSON.parse(storedTodos)
            }
        });
    }, []);

    useEffect(() => {
        const todosString = JSON.stringify(todos);
        localStorage.setItem("todos", todosString);
    }, [todos]);

    return (
        <div className="TodoList">
            <NewTodoForm />
            <h1>Your Todo List</h1>
            <div className="TodoList-todos">
                {todos.map(({ id, text, completed }) => (
                    <Todo
                        key={id}
                        id={id}
                        text={text}
                        completed={completed}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoList;
