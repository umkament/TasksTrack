import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "features/todolists-list/model/tasks /tasks.slice";
import { todolistsSlice } from "features/todolists-list/model/todolists/todolists.slice";
import { appSlice } from "app/model/app.slice";
import { authSlice } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
