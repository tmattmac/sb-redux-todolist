import { render } from '@testing-library/react';
import TodoList from './TodoList';

test('renders', () => {
  render(<TodoList />);
});

test('render matches snapshot', () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});