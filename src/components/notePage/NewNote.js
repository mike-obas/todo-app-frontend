import React from "react";
import Note from "./Note";
import { useParams } from "react-router-dom";

function NewNote() {
  const { actionType } = useParams();
  return (
    <Note
      title={""}
      description={""}
      actionType={`${actionType}`}
      noteId="save"
    />
  );
}

export default NewNote;
