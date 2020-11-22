import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

test('renders', () => {
    render(<NewTodoForm />);
});

test('render matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

test('submitting data calls callback with data', () => {
    const mockAddTodo = jest.fn();
    const { getByText, getByTestId } = render(<NewTodoForm addTodo={mockAddTodo} />);
    const form = getByTestId('form');
    const input = form.querySelector('input');
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.submit(form);
    
    expect(mockAddTodo).toHaveBeenCalledWith(
        expect.objectContaining({ text: "Test Todo" })
    );
});