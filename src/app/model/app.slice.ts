import {
  createSlice,
  isFulfilled,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        //(action) => (action.type.endsWith("/pending"))
        isPending,
        (state, action) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"), //isRejected,
        (state, action) => {
          state.status = "failed";
          //if (action.type.includes("addTodolist")) return; - таким образом исключаем какой-то action
          const { payload, error } = action;
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length
                ? payload.data.messages[0]
                : "Some error occurred";
            }
          } else {
            state.error = error.message ? error.message : "Some error occurred";
          }
        },
      )
      .addMatcher(
        isFulfilled, //(action) => (action.type.endsWith("/fulfilled")),
        (state, action) => {
          state.status = "succeeded";
        },
      );
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
