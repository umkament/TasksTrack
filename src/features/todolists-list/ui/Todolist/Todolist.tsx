import React, { FC, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/model/todolists/todolists.slice";
import { tasksThunks } from "features/todolists-list/model/tasks /tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "../../api/tasks/tasks.api.types";
import s from "./Todolist.module.css";
import { FilterTasksButtons } from "../FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "../Tasks/Tasks";
import { TodolistTitle } from "../TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = React.memo(function ({ todolist, tasks }) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
        disabled={todolist.entityStatus === "loading"}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <div className={s.buttonGroup}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
