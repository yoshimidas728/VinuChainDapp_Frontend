import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  const nav = useNavigate();
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      color={"#F83D4B"}
      height={"80vh"}
    >
      <Typography Typography variant="h1" fontWeight={"bold"}>
        {" "}
        {error.status}
      </Typography>
      <Typography variant="h6">{error.statusText}</Typography>
      <Button onClick={() => nav('/')}>Return to Dashboard</Button>
    </Stack>
  );
};

export default ErrorPage;
