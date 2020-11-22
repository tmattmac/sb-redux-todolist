import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('renders', () => {
    render(<Todo text="test" completed={false} />);
});

test('render matches snapshot', () => {
  const { asFragment } = render(<Todo text="test" completed={false} />);
  expect(asFragment()).toMatchSnapshot();
});

test('non-completed todo does not have strikethrough', () => {
    const { getByText } = render(<Todo text="test" completed={false} />);
    const text = getByText("test");
    expect(text).not.toHaveClass("Todo-completed");
});

test('completed todo has strikethrough', () => {
    const { getByText } = render(<Todo text="test" completed={true} />);
    const text = getByText("test");
    expect(text).toHaveClass("Todo-completed");
});

test('can edit todo', () => {
    const mockUpdateTodo = jest.fn();
    const { getByText, queryByDisplayValue } = render(
        <Todo text="test" completed={false} update={mockUpdateTodo} />
    );
    const text = getByText("test");
    fireEvent.click(text);
    expect(text).not.toBeInTheDocument();
    const input = queryByDisplayValue("test");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "updated" } });
    fireEvent.submit(input); // enter key

    expect(mockUpdateTodo).toHaveBeenCalledWith(
        expect.objectContaining({ text: "updated" })
    );
});