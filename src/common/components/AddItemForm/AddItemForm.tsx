import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";
import { RejectValueType } from "../../utils/create-app-async-thunk";
import { purple } from "@mui/material/colors";
import s from "./AddItemForm.module.css";

type Props = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItemForm: FC<Props> = React.memo(
  ({ addItem, disabled = false }) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
      if (title.trim() !== "") {
        addItem(title)
          .then(() => {
            setTitle("");
          })
          .catch((err: RejectValueType) => {
            if (err.data) {
              const message = err.data.messages;
              setError(message.length ? message[0] : "some error occurred");
            }
          });
      } else {
        setError("Title is required");
      }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }
      if (e.charCode === 13) {
        addItemHandler();
      }
    };

    return (
      <div className={s.container}>
        <TextField
          variant="outlined"
          disabled={disabled}
          error={!!error}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          label="create your task"
          helperText={error}
        />
        <IconButton
          color="primary"
          onClick={addItemHandler}
          disabled={disabled}
        >
          <LibraryAdd sx={{ color: purple[200] }} />
        </IconButton>
      </div>
    );
  },
);
