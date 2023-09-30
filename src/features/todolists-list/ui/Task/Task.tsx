import React, { ChangeEvent, FC, memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "../../api/tasks/tasks.api.types";
import { useActions } from "../../../../common/hooks";
import { tasksThunks } from "../../model/tasks /tasks.slice";
import s from "./Task.module.css";
import { purple } from "@mui/material/colors";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status },
      todolistId,
    });
  };

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  const styleIsDone = task.status === TaskStatuses.Completed ? s.isDone : "";

  return (
    <div key={task.id} className={`${styleIsDone} ${s.container}`}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="secondary"
        onChange={changeStatusHandler}
        sx={{ color: purple[300] }}
      />
      <div className={s.taskTitle}>
        <EditableSpan value={task.title} onChange={changeTitleHandler} />
      </div>

      <IconButton
        onClick={removeTaskHandler}
        style={{ position: "absolute", top: "2px", right: "2px" }}
      >
        <DeleteForever sx={{ color: purple[300] }} />
      </IconButton>
    </div>
  );
});
