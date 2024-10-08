import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { toast } from 'react-hot-toast'
import Logo from "../../../assets/images/inkspire_logo_final_black.png"
import axios from "../../../axios/AxiosConfig";

function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          Inkspire
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
}  
const theme = createTheme();

function ForgetPassword() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
          email: data.get("email"),
        };
        if(!payload.email){
          return toast.error("Email is required");
        }else{
          console.log("calling");
          const response = await axios.post('/user/resetPassword',payload);
          
          if(response.error){
            return toast.error(response.data.message);
          }else{
            toast.success("Rest password email sent")
          }
        }
        // here is the api call.

      };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

            <img
              src={`${Logo}`}
              style={{width: '12rem', cursor: "pointer"}}
              onClick={() => navigate("/")}
            />
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default ForgetPassword