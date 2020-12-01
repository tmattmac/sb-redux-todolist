import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewTodoForm.css';
import { v4 as uuid } from 'uuid';

function NewTodoForm() {
    const [formData, setFormData] = useState({ text: '' });
    const dispatch = useDispatch()
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'ADD_TODO',
            payload: {
                todo: {
                    id: uuid(),
                    completed: false,
                    text: formData.text
                }
            }
        });
        setFormData({ text: '' });
    };

    return (
        <form className="NewTodoForm" onSubmit={handleSubmit} data-testid="form">
            <input
                type="text"
                placeholder="Add todo text here"
                name="text"
                value={formData.text}
                onChange={handleChange}
            />
            <button disabled={!Boolean(formData.text)}>Add</button>
        </form>
    );
}

export default NewTodoForm;
