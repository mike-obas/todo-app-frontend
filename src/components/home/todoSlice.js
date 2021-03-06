import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firstBatchTodos } from "./todoApi";

const initialState = {
  value: {},
  status: "",
  error: "",
};

export const getTodos = createAsyncThunk(
  "todos/firstBatchTodos",
  async (orderClause) => {
    const response = await firstBatchTodos(orderClause);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //Useful, when creating a new todo using modal
    createTodo: (state, action) => {
      state.value = {...action.payload, ...state.value};
    },
    //Useful, when updating a todo using modal
    updateTodo: (state, action) => {
      state.value = {...action.payload, ...state.value};
    },
    deleteTodo: (state, action) => {
      delete state.value[action.payload];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "idle";
        state.error = { ...state.error, ...action.error };
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;

// Select a value from the state
export const selectTodos = (state) => state.todos.value;
export const selectStatus = (state) => state.todos.status;

export default todoSlice.reducer;
