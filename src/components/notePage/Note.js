import React, { useState, useReducer } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { IconButton, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DoneAllSharpIcon from "@mui/icons-material/DoneAllSharp";
import NavBar from "../Header";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CircularProgress from "../../utils/CircularProgress";
import { useNavigate } from "react-router-dom";
import { checkNoteInputs } from "../../utils/checkInputs";
import { manageTodo } from "../home/todoApi";

const Icon = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <BackButton onClick={goBack}>
      <ArrowBack sx={{ color: "#ffffff" }} />
    </BackButton>
  );
};

const BackButton = styled(IconButton)({
  marginRight: 20,
});

const Container = styled("div")({
  maxWidth: 1200,
  margin: "auto",
  padding: "0px 20px",
});

const PaperContainer = styled(Paper)({
  maxWidth: 600,
  margin: "40px auto",
  padding: "30px 20px",
});

function Note({ title, description, actionType, noteId }) {
  const initialInput = {
    title: title,
    description: description,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "insertValue":
        return { ...state, [action.field]: action.fieldValue };
      case "removeValue":
        return initialInput;
      default:
        return state;
    }
  };

  const initialError = {};
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [input, setInput] = useReducer(reducer, initialInput);
  const [errors, setErrors] = useState(initialError);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setButtonLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(true);
      navigate("/");
    }, 1000);
  };

  const formHandler = (e) => {
    setErrors({ ...errors, [e.target.name]: undefined });
    setInput({
      type: "insertValue",
      field: e.target.name,
      fieldValue: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const { valid, checkErrors } = checkNoteInputs(input);
    if (!valid) {
      return setErrors({ ...errors, ...checkErrors });
    }
    manageTodo(noteId, input);
    setButtonLoading(true);
    handleSuccess();
  };

  return (
    <>
      <NavBar
        extraStyle={{ justifyContent: "flex-start" }}
        backIcon={<Icon />}
        text={`${actionType} note`}
      />

      <Container>
        {/* Form */}
        <PaperContainer elevation={5}>
          <TextField
            error={errors.title && true}
            helperText={errors.title && errors.title}
            label="title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={input.title}
            onChange={formHandler}
          />

          <TextField
            error={errors.description && true}
            helperText={errors.description && errors.description}
            label="description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            name="description"
            value={input.description}
            onChange={formHandler}
          />

          <Button
            onClick={submitHandler}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            type="submit"
            sx={{ marginTop: 3 }}
            startIcon={success ? <DoneAllSharpIcon color="success" /> : ""}
            disabled={buttonLoading || success}
          >
            {buttonLoading && <CircularProgress />}
            <Typography
              variant="subtitle1"
              sx={{ color: !success ? "white" : "green" }}
            >
              {!success ? `${actionType}` : `${actionType}d`}
            </Typography>
          </Button>
        </PaperContainer>
      </Container>
    </>
  );
}

export default Note;
