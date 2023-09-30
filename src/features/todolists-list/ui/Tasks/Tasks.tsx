import React, { FC } from "react";
import { Task } from "../Task/Task";
import { TaskStatuses } from "../../../../common/enums";
import { TodolistDomainType } from "../../model/todolists/todolists.slice";
import { TaskType } from "../../api/tasks/tasks.api.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};
export const Tasks: FC<Props> = ({ tasks, todolist }) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </div>
  );
};
