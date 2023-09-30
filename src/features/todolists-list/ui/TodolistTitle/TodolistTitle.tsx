import React, { FC } from "react";
import { EditableSpan } from "../../../../common/components";
import { IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useActions } from "../../../../common/hooks";
import {
  TodolistDomainType,
  todolistsThunks,
} from "../../model/todolists/todolists.slice";
import { purple } from "@mui/material/colors";
import s from "./TodolistTitle.module.css";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCallback = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title });
  };
  return (
    <div className={s.titleWrapper}>
      <h3 className={s.title}>
        <EditableSpan
          value={todolist.title}
          onChange={changeTodolistTitleCallback}
        />
      </h3>
      <IconButton
        onClick={removeTodolistCallback}
        disabled={todolist.entityStatus === "loading"}
      >
        <DeleteForever fontSize="medium" sx={{ color: purple[200] }} />
      </IconButton>
    </div>
  );
};
