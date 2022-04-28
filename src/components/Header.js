import React from "react";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Header = styled(Paper)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.primary.main,
  alignItems: "center",
  height: 70,
  borderRadius: 0,
  padding: "0px 20px",
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  textTransform: "capitalize",
}));

function NavBar({ backIcon, text, extraStyle }) {
  return (
    <Header elevation={1} sx={{ ...extraStyle }}>
      {backIcon && backIcon}
      <HeaderText noWrap>{text}</HeaderText>
    </Header>
  );
}

export default NavBar;
