import * as React from "react";
import {useParams} from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
import { green } from "@mui/material/colors";
import { useEffect } from "react";
import { useState } from "react";


const theme = createTheme();

function EmailVerification() {
    const navigate = useNavigate();
    const [emailVerified, setEmailVerified] = useState(true);
  const {id} = useParams();

  useEffect(async() => {
    const payload = {};
    try {
      axios.interceptors.request.use(
        (config) => {
          if (id) {
            config.headers["Authorization"] = "Bearer " + id;
          }
          return config;
        },
      )
      const response = await axios.put('/user/verifyEmail',payload);
      console.log(response);
      if(response.error){
        setEmailVerified(false);
      }else{
        setEmailVerified(true);
      }
    } catch (error) {
      console.log(error)
      return
    }
      
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
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
          {emailVerified?(
            <Box sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <DoneAllIcon fontSize="large" style={{color:"green"}} className="icon" />
              <h1>Email Verification Successful!</h1>    
              <p style={{display:"flex",flexWrap:"flex",justifyContent:"center"}}>Congratulations! Your email address has been successfully verified. You can now enjoy full access to our platform and its exciting features. Thank you for joining our community.</p> 
            </Box>

          ):(
            <Box>
              <h1>Invalid Email Verifiaction Link </h1>     
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EmailVerification