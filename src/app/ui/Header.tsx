import React from "react";
import {
  AppBar,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../features/auth/model/auth.selectors";
import { selectAppStatus } from "../model/app.selectors";
import { useActions } from "../../common/hooks";
import { authThunks } from "../../features/auth/model/auth.slice";
import s from "./App.module.css";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAppStatus);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => logout();
  return (
    <>
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Toolbar className={s.headerFlex}>
          <Typography variant="h5">
            ...Todolist - don't keep it in your head, write it down...
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </>
  );
};
