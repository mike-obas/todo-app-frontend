import React, { useEffect, useState } from "react";
import Note from "./Note";
import { eachTodo } from "../home/todoApi";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

function EditNote() {
  const { actionType, noteId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    let cancel = false;
    eachTodo(noteId)
      .then((res) => {
        return setData(res.data);
      })
      .catch();
    if (cancel) return;
    return () => {
      cancel = true;
    };
  }, [noteId]);

  return (
    data.title ? (
      <Note
        title={`${data.title}`}
        description={`${data.description}`}
        actionType={`${actionType}`}
        noteId={noteId}
      />
    )
    : 
    <Typography>
    ...Loading
    </Typography>
  );
}

export default EditNote;
