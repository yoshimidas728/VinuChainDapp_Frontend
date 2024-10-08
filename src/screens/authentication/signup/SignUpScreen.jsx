import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { FormControl, Input, InputLabel } from "@mui/material";
import { IMaskInput } from "react-imask";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/auth/actions";
import Logo from '../../../assets/images/inkspire_logo_final_black.png'
import toast from "react-hot-toast";

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
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const SignUpScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState('')
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const handleSubmit = (event) => {
    console.log('this is the handle button: ', { address, isWalletConnected });
    event.preventDefault();
    if(!address){
      toast.error('Please connect wallet')
    }
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      walletAddress: address,
    };
    dispatch(registerUser(payload, navigate));
  };
  const [values, setValues] = useState({
    number: "(100) 000-0000",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseNavMenu = async (page = "") => {

    if (page) {

      if (window?.vitePassport) {

        try {
          await window.vitePassport.connectWallet();

          const activeNetwork = await window.vitePassport.getNetwork();
          const connectedAddress =
            await window.vitePassport.getConnectedAddress();
          setAddress(connectedAddress);

          setIsWalletConnected(Boolean(connectedAddress));
        } catch (error) {
          console.log(error);
        }
      }
    }
    // setAnchorElNav(null);
  };

  return (
    <>
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
              Sign Up
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
              {/* {
                !address && ()
              } */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Phone Number
                </InputLabel>
                <Input
                  variant="outlined"
                  value={values.number}
                  onChange={handleChange}
                  name="number"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </FormControl> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => handleCloseNavMenu('SingUp')}
                fullWidth
                variant="contained"
                sx={{ mt: 0.2, mb: 2 }}
              >
                Connect Wallet
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => navigate("/login")}
                    sx={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUpScreen;
