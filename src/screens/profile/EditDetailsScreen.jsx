import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  GitHub,
  LinkedIn,
  Edit,
  Lock,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "../../components/Modal/Modal";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateProfile, clearState } from '../../store/profile/actions'
import { useSelector } from "react-redux";


const EditDetailsScreen = ({ viewProfile, setProfile, formik }) => {
  const { theme } = useSelector((state) => state.themeReducer);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [selectedStates, setSelectedStates] = useState(true);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    walletAddress:"",
  });
  const nav = useNavigate();
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setProfile(!viewProfile);
    setShowModal(false);
  };

  const handleSaveHandler = () => {
    dispatch(updateProfile(inputs))
    setProfile(!viewProfile);
    setShowModal(false);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  
  const themeColor=  ( theme === 'black' ? '#27374D' : '')
  const textColor = (theme === 'black' ? '#E4E4E4' : '')
  return (
    <Stack px={5} spacing={3}  bgcolor= { theme === 'black' ? '#27374D' : ''}
    color={theme === 'black' ? '#E4E4E4' : ''}>
      <Card sx={{ width: "100%" }} elevation={3}  style={{backgroundColor:themeColor, color:textColor}}>
        <CardHeader title="Personal Details"></CardHeader>

        <CardContent>
          <Grid>
            <Grid className="viewField" container xs={12} spacing={3}>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <TextField
                  style={{textColor}}
                  label="First Name"
                  onChange={handleInputChange}
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  disabled={false}
                />
              </Grid>
            </Grid>
            <Grid className="viewField" container xs={12} spacing={3}>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <Typography sx={{ whiteSpace: "nowrap" }}>Last Name</Typography>
              </Grid>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  onChange={handleInputChange}
                  name="lastName"
                  fullWidth
                  disabled={false}
                />
              </Grid>
            </Grid>
            <Grid className="viewField" container xs={12} spacing={3}>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  Display Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Display Name"
                  variant="outlined"
                  name="displayName"
                  onChange={handleInputChange}
                  fullWidth
                  disabled={false}
                />
              </Grid>
            </Grid>

            <Grid
              sx={{
                justifyContent: "center",
                display: "flex",
                marginTop: "1rem",
              }}
            >
              <Button
                type="submit"
                onClick={handleOpen}
                variant="outline"
                sx={{
                  backgroundColor: "black",
                  marginBottom: "0.5rem",

                  textAlign: "center",
                  color: "white",

                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <BasicModal isOpen={showModal} onClose={handleClose} handleSave={handleSaveHandler} />
    </Stack>
  );
};

export default EditDetailsScreen;
