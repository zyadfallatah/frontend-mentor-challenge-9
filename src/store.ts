import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { STATUS } from "./components/TodoStatus";

export type TodoType = {
  todoID: number;
  todoName: string;
  completed: boolean;
};

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [] as TodoType[],
    todos: { value: [] as TodoType[], cache: STATUS.ALL as string },
    IDGen: 0,
  },
  reducers: {
    setTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.allTodos = action.payload;
      state.IDGen = state.allTodos[state.allTodos.length - 1].todoID;
      state.todos.value = state.allTodos;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.IDGen++;
      state.allTodos = [
        ...state.allTodos,
        { todoID: state.IDGen, completed: false, todoName: action.payload },
      ];
      localStorage.setItem("todos", JSON.stringify(state.allTodos));
      switch (state.todos.cache) {
        case STATUS.ALL:
          state.todos.value = state.allTodos;
          break;
        case STATUS.ACTIVE:
          state.todos.value = state.allTodos.filter((todo) => !todo.completed);
          break;
        case STATUS.COMPLETED:
          state.todos.value = state.allTodos.filter((todo) => todo.completed);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.todoID !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(state.allTodos));

      if (state.allTodos.length === 0) localStorage.removeItem("todos");

      switch (state.todos.cache) {
        case STATUS.ALL:
          state.todos.value = state.allTodos;
          break;
        case STATUS.ACTIVE:
          state.todos.value = state.allTodos.filter((todo) => !todo.completed);
          break;
        case STATUS.COMPLETED:
          state.todos.value = state.allTodos.filter((todo) => todo.completed);
      }
    },
    clearTodos: (state) => {
      state.allTodos = state.allTodos.filter((todo) => todo.completed !== true);
      localStorage.setItem("todos", JSON.stringify(state.allTodos));

      if (state.allTodos.length === 0) localStorage.removeItem("todos");

      switch (state.todos.cache) {
        case STATUS.ALL:
          state.todos.value = state.allTodos;
          break;
        case STATUS.ACTIVE:
          state.todos.value = state.allTodos.filter((todo) => !todo.completed);
          break;
        case STATUS.COMPLETED:
          state.todos.value = state.allTodos.filter((todo) => todo.completed);
      }
    },
    toggleCompletion: (state, action: PayloadAction<number>) => {
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.todoID === action.payload) todo.completed = !todo.completed;
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.allTodos));
      switch (state.todos.cache) {
        case STATUS.ALL:
          state.todos.value = state.allTodos;
          break;
        case STATUS.ACTIVE:
          state.todos.value = state.allTodos.filter((todo) => !todo.completed);
          break;
        case STATUS.COMPLETED:
          state.todos.value = state.allTodos.filter((todo) => todo.completed);
      }
    },
    filterActiveTodos: (state) => {
      state.todos.value = state.allTodos.filter((todo) => !todo.completed);
      state.todos.cache = STATUS.ACTIVE;
    },
    filterCompletedTodos: (state) => {
      state.todos.value = state.allTodos.filter((todo) => todo.completed);
      state.todos.cache = STATUS.COMPLETED;
    },
    removeTodoFilters: (state) => {
      state.todos.value = state.allTodos;
      state.todos.cache = STATUS.ALL;
    },
  },
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: false },
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value = !state.value;
      localStorage.setItem("theme", JSON.stringify(state.value));
    },
  },
});

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    theme: themeSlice.reducer,
  },
});

type RootType = ReturnType<typeof store.getState>;

export const todoSelector = (state: RootType) => state.todos;
export const themeSelector = (state: RootType) => state.theme;

export const {
  setTodos,
  addTodo,
  clearTodos,
  removeTodo,
  toggleCompletion,
  filterActiveTodos,
  filterCompletedTodos,
  removeTodoFilters,
} = todosSlice.actions;

export const { toggleTheme, setTheme } = themeSlice.actions;
