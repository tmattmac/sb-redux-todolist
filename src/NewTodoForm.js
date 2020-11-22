import React, { useState, useRef } from 'react';
import './NewTodoForm.css';

function NewTodoForm({ addTodo }) {
    const [formData, setFormData] = useState({ text: '' });
    const form = useRef(null);
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(formData);
        setFormData({ text: '' });
    };

    return (
        <form className="NewTodoForm" onSubmit={handleSubmit} ref={form} data-testid="form">
            <input
                type="text"
                placeholder="Add todo text here"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
            />
            <button>Add</button>
        </form>
    );
}

export default NewTodoForm;
