import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, deleteTodo, selectTodos, selectStatus } from "./todoSlice";
import { deleteTodo as deleteItem } from "./todoApi";
import NavBar from "../Header";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
// styling is done using MATERIAL UI, v5
import { styled, useTheme } from "@mui/material/styles";
import { Typography, Paper, Grid, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const PageContent = styled("div")({
  maxWidth: 1200,
  padding: "0px 10px",
  margin: "auto",
});

const AddFirstTodo = styled(Paper)({
  maxWidth: 800,
  margin: "10px auto",
  padding: "20px",
  height: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const AddFirstTodoButton = styled(IconButton)(({ theme }) => ({
  marginBottom: 5,
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const AddFirstTodoText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const Todos = styled(Grid)({
  padding: "20px 0px 60px",
  maxWidth: "800px",
  margin: "auto",
});

const Item = styled(Paper)(({ theme }) => ({
  padding: "15px 20px",
  [theme.breakpoints.down("sm")]: {
    padding: 10,
  },
}));

const TodoContent = styled(Grid)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const EditIconContainer = styled(Grid)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down(700)]: {
    marginRight: 10,
  },
  [theme.breakpoints.down(500)]: {
    marginRight: 18,
  },
  [theme.breakpoints.down(400)]: {
    marginRight: 22,
  },
  [theme.breakpoints.down(350)]: {
    marginRight: 25,
  },
}));

const EditButton = styled(IconButton)({
  backgroundColor: "#d1e6fa",
  "&:hover": {
    backgroundColor: "#bad9f7",
  },
});

const DeleteIconContainer = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  position: "unset",
  [theme.breakpoints.down(300)]: {
    display: "none",
  },
}));

const TodoText = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  ...theme.typography.subtitle1,
  color: theme.palette.text.primary,
  fontWeight: 600,
  marginBottom: "-2px",
}));

const TodoDate = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  fontWeight: 600,
}));

const FloatingIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: 30,
  right: 200,
  [theme.breakpoints.down(1200)]: {
    right: 150,
  },
  [theme.breakpoints.down("md")]: {
    bottom: 20,
    right: 25,
  },
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Todo = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down(600));
  const notes = useSelector(selectTodos);
  const notesArray = Object.values(notes);
  const notesLength = notesArray.length;
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    dispatch(getTodos("createdAt-desc"));
    if (cancel) return;
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line
  }, []);

  const handleDeleteNote = (noteId) => {
    dispatch(deleteTodo(noteId));
    return deleteItem(noteId);
  };

  const refineDate = (date) => {
    const options = {year: 'numeric', month: 'short', day: '2-digit' };
    const newDate = new Date(date).toLocaleDateString('en-EN', options);
    return newDate;
  }

  return (
    <>
      {/* A simple NavBar */}
      <NavBar text="Todo List" extraStyle={{ justifyContent: "center" }} />

      <FloatingIconButton
        size="large"
        aria-label="add note"
        component={Link}
        to="/note/save"
        className="routerLink"
      >
        <Add />
      </FloatingIconButton>

      <PageContent>
        {/* todo list */}
        {status === "loading" ? (
          "...Loading"
        ) : (
          <Todos container>
            {/* iterate over notes in redux store and display them on the frontend */}
            {notesArray.map((item) => (
              <Grid key={item.noteId} item xs={12} sx={{ marginBottom: 1 }}>
                <Item elevation={8}>
                  <TodoContent container flexWrap="nowrap">
                    <EditIconContainer
                      item
                      xs={1}
                      component={Link}
                      to={`/note/update/${item.noteId}`}
                      className="routerLink"
                    >
                      <EditButton
                        aria-label="edit note"
                        size={smallScreen ? "medium" : "large"}
                        color="primary"
                      >
                        <Edit />
                      </EditButton>
                    </EditIconContainer>

                    <Grid
                      item
                      xs={9}
                      component={Link}
                      to={`/note/update/${item.noteId}`}
                      className="routerLink"
                    >
                      <TodoText noWrap>{item.title}</TodoText>
                      <TodoDate noWrap>{refineDate(item.createdAt)}</TodoDate>
                    </Grid>

                    <DeleteIconContainer item xs={2}>
                      <IconButton
                        onClick={() => handleDeleteNote(item.noteId)}
                        size={smallScreen ? "medium" : "large"}
                        aria-label="delete note"
                      >
                        <Delete />
                      </IconButton>
                    </DeleteIconContainer>
                  </TodoContent>
                </Item>
              </Grid>
            ))}
          </Todos>
        )}
        {notesLength === 0 && status === "idle" ? (
          <AddFirstTodo
            elevation={5}
            component={Link}
            to="/note/save"
            className="routerLink"
          >
            {/* todo list */}
            <AddFirstTodoButton aria-label="add first note">
              <Add />
            </AddFirstTodoButton>
            <AddFirstTodoText>Tap here to add a note</AddFirstTodoText>
          </AddFirstTodo>
        ) : (
          ""
        )}
      </PageContent>
    </>
  );
};

export default Todo;
