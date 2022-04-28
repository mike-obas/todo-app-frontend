import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../components/home/Todo";
import NewNote from "../components/notePage/NewNote";
import EditNote from "../components/notePage/EditNote";

function Main() {
  return (
    <Routes>
      <Route exact path="/" element={<Todo />} />
      <Route exact path="/note/:actionType" element={<NewNote />} />
      <Route exact path="/note/:actionType/:noteId" element={<EditNote />} />
    </Routes>
  );
}

export default Main;
