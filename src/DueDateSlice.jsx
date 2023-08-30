// Redux slice (tasksSlice.js)
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todoList: [],
//   sortCriteria: "All",
// };

// const dueDateSlice = createSlice({
//   name: "tasks",
//   initialState: [],
//   reducers: {
//     addTask: (state, action) => {
//       state.push(action.payload);
//     },
//     updateDueDate: (state, action) => {
//       const { taskId, dueDate } = action.payload;
//       const taskToUpdate = state.find((task) => task.id === taskId);
//       if (taskToUpdate) {
//         taskToUpdate.dueDate = dueDate;
//       }
//     },
// Other reducers...
//   },
// });

// export const { addTask, updateDueDate } = dueDateSlice.actions;

// export default dueDateSlice.reducer;
