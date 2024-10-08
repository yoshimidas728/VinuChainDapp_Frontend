import * as React from "react";
import {useParams} from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Logo from "../../../assets/images/inkspire_logo_final_black.png"
import { toast } from "react-hot-toast";
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

function ResetPassword() {
    const navigate = useNavigate();
    const {id} = useParams();

    const handleSubmit =async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get("newPassword") != data.get("reTypePassword")){
            return toast.error("Password doesn't match");
        }
        const payload = {
          "password": data.get("newPassword"),
        };
        if(!payload.password){
          return toast.error("Password is required");
        }else{
          axios.interceptors.request.use(
            (config) => {
              if (id) {
                config.headers["Authorization"] = "Bearer " + id;
              }
              return config;
            },
          )
          const response = await axios.put('/user/resetPassword',payload);
          console.log(response);
          if(response.error){
              return toast.error("Invalid link")
          }else{
            toast.success("Password updated");
            return navigate('/login');
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
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              autoFocus
            />
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="reTypePassword"
              label="Retype Password"
              name="reTypePassword"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                
              }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default ResetPassword