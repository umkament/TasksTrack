import { authSlice, authThunks } from "./auth.slice";

let startState: { isLoggedIn: boolean };

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  };
});

test("isLoggedIn should be true", () => {
  const arg = { isLoggedIn: true };
  const action = authThunks.login.fulfilled(arg, "requestId", {
    email: "",
    rememberMe: true,
    password: "",
  });
  const endState = authSlice(startState, action);
  expect(endState.isLoggedIn).toBe(true);
});
