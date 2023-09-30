import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { appActions } from "app/model/app.slice";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
import { ResultCode } from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  "auth/Login",
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors.length;
      return rejectWithValue({
        data: res.data,
        showGlobalError: isShowAppError,
      });
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(null);
    }
  },
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "app/initializeApp",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true };
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(initializeApp.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      ///////////////////////////////////////////////////////////////
      // .addMatcher(
      //   (action) => {
      //     // если выполняется одно из условий, то функция вернет true и пойдет дальше
      //     // иначе false и в reducer мы не попадем
      //     return (
      //       action.type === "auth/login/fulfilled" ||
      //       action.type === "auth/logout/fulfilled" ||
      //       action.type === "app/initializeApp/fulfilled"
      //     );
      //   },
      //   (state, action) => {
      //     state.isLoggedIn = action.payload.isLoggedIn;
      //   },
      // )
      .addMatcher(
        isAnyOf(
          authThunks.login.fulfilled,
          authThunks.logout.fulfilled,
          authThunks.initializeApp.fulfilled,
        ),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      );
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
