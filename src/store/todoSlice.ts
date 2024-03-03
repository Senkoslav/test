import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  startTime?: number; 
}

type TodosState = {
  list: Todo[];
  timer: number; 
}

const initialState: TodosState = {
  list: [],
  timer: 0, 
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
        startTime: undefined, 
      });
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find(todo => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
        if (toggledTodo.completed) {
          toggledTodo.startTime = Date.now(); 
        } else {
          toggledTodo.startTime = undefined; 
        }
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload; 
    },
  },
});

export const { addTodo, toggleComplete, removeTodo, setTimer } = todoSlice.actions;

export default todoSlice.reducer;