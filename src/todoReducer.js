const reducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.payload.todos };
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, action.payload.todo]}
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
    case 'UPDATE_TODO':
      const todosCopy = state.todos.map(todo => {
        if (todo.id === action.payload.id)
          return { ...todo, ...action.payload.todo };
        return todo;
      });
      return { ...state, todos: todosCopy };
    default:
      return state;
  }
}

export default reducer;