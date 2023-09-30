import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import s from "./App.module.css";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/model/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { Header } from "./Header";
import { Routing } from "./Routing";

export const App = () => {
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.circularProgress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className={s.container}>
        <ErrorSnackbar />
        <Header />
        <Routing />
      </div>
    </BrowserRouter>
  );
};
