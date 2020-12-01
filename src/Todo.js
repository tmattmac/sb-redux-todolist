import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './Todo.css';

function Todo({ id, text, completed }) {
    const [editing, setEditing] = useState(false);
    const todoInput = useRef(null);
    const dispatch = useDispatch();
    
    // TODO: Make sure this doesn't cause issues when multiple being edited
    useEffect(() => {
        todoInput.current && todoInput.current.focus();
    }, [todoInput, editing]);

    const handleChange = () => {
        dispatch({
            type: 'UPDATE_TODO',
            payload: {
                id,
                todo: { completed: !completed }
            }
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setEditing(false);
        const newText = todoInput.current.value;
        dispatch({
            type: 'UPDATE_TODO',
            payload: {
                id,
                todo: { text: newText }
            }
        });
    };

    const handleEditText = () => {
        setEditing(true);
    };

    const handleDelete = () => {
        dispatch({
            type: 'REMOVE_TODO',
            payload: { id }
        });
    };

    const todoTextDisplay = (
        editing ?
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={todoInput}
                    defaultValue={text}
                    required
                />
            </form>
            :
            <span
                className={completed ? "Todo-completed" : null}
                onClick={handleEditText}
            >
                {text}
            </span>
    )

    return (
        <div className="Todo">
            <input
                type="checkbox"
                name="completed"
                checked={completed}
                onChange={handleChange}
            />
            <div className="Todo-text">
                {todoTextDisplay}
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Todo;
