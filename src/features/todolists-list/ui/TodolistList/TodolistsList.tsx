import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/todolists-list/model/todolists/todolists.slice";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "../Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/todolists-list/model/tasks /tasks.selectors";
import { selectTodolists } from "features/todolists-list/model/todolists/todolists.selectors";
import s from "./TodolistsList.module.css";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/Login"} />;
  }

  return (
    <>
      <Grid container justifyContent="center" className={s.grid}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item xs={8} sm={6} md={4} key={tl.id}>
              <Paper elevation={9} className={s.paper}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
