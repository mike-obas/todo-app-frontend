import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const Progress = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12,
  color: theme.palette.primary.main,
}));

function MyProgress() {
  return (
    <>
      <Progress size={24} />
    </>
  );
}

export default MyProgress;
