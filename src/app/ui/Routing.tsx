import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "../../features/todolists-list/ui/TodolistList/TodolistsList";
import { Login } from "../../features/auth/ui/Login/Login";
import { Container } from "@mui/material";
import s from "./App.module.css";

export const Routing = () => {
  return (
    <>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/TasksTrack"} element={<TodolistsList />} />
          <Route path={"/Login"} element={<Login />} />
          <Route
            path={"/404"}
            element={<h1 className={s.errorHeader}>PAGE NOT FOUND:</h1>}
          />
          <Route path={"*"} element={<Navigate to={"404"} />} />
        </Routes>
      </Container>
    </>
  );
};
