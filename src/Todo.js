import React, { useState, useEffect, useRef } from 'react';
import './Todo.css';

function Todo({ text, completed, update, remove }) {
    const [editing, setEditing] = useState(false);
    const todoInput = useRef(null);
    
    // TODO: Make sure this doesn't cause issues when multiple being edited
    useEffect(() => {
        todoInput.current && todoInput.current.focus();
    }, [todoInput, editing]);

    const handleChange = () => {
        update({ text, completed: !completed });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setEditing(false);
        const newText = todoInput.current.value;
        update({ completed, text: newText });
    };

    const handleEditText = () => {
        setEditing(true);
    };

    const handleDelete = remove;

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
