import { useState, useEffect } from 'react';
import { useAppDispatch } from '../hook';
import { toggleComplete, removeTodo } from '../store/todoSlice';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (completed && !timerId) {
      startTimer();
    } else if (!completed && timerId) {
      stopTimer();
    }

    return () => {
      if (timerId) {
        stopTimer();
      }
    };
  }, [completed]);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    setTimerId(intervalId);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const handleToggleComplete = () => {
    dispatch(toggleComplete(id));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days} дней ${hours} часов ${minutes} минут ${remainingSeconds} секунд`;
  };

  return (
    <li>
      <span>{title}</span>
      <button onClick={handleToggleComplete}>
        {completed ? formatTime(timer) : 'Старт'}
      </button>
      <button onClick={handleRemoveTodo}>&times;</button>
    </li>
  );
};

export default TodoItem;