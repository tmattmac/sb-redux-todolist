import TodoList from './TodoList';
import './App.css';
import { Provider } from 'react-redux';
import reducer from './todoReducer';
import { createStore } from 'redux';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
