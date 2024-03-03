import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hook';

import { addTodo, setTimer } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.todos.timer); 

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setTimer(timer + 1)); 
    }, 1000);

    return () => {
      clearInterval(interval); 
    };
  }, [dispatch, timer]);

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className='App'>
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      <TodoList />
    </div>
  );
}

export default App;