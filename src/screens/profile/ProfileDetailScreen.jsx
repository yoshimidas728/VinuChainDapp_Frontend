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
import { useSelector } from "react-redux";

const ProfileDetailScreen = ({ viewProfile, setProfile }) => {
  const { profile } = useSelector((state) => state.profileReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  const [showModal, setshowModal] = useState(false);
  const nav = useNavigate();
  let firstNamePlaceholder=null;
  firstNamePlaceholder=(profile.data?.firstName||"Harry");
  let lastNamePlaceholder=null;
  lastNamePlaceholder=(profile.data?.lastName||"Portor");
  let displayNamePlaceholder=null;
  displayNamePlaceholder=(profile.data?.displayName||"Making Cent");

  const themeColor=  ( theme === 'black' ? '#27374D' : '')
  const textColor = (theme === 'black' ? '#E4E4E4' : '')
  
  return (
    <Stack 
      px={5}
      spacing={3}
    >
      <Card sx={{ width: "100%" }} style={{backgroundColor:themeColor, color:textColor}} elevation={3}>
        <CardHeader
          action={
            <Fab
              onClick={() => setProfile(!viewProfile)}
              sx={{ backgroundColor: "black", color: "white" }}
              aria-label="edit"
            >
              <EditIcon />
            </Fab>
          }
          title="Personal Details"
        ></CardHeader>
        <CardContent>
          <Grid>
            <Grid 
              className="viewField" container xs={12} spacing={3}>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <Typography sx={{ whiteSpace: "nowrap" }}>
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <TextField
                  id="plain"
                  value={firstNamePlaceholder}
                  fullWidth
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid className="viewField" container xs={12} spacing={3}>
              <Grid item xs={12} md={4} direction={"row"} spacing={2}>
                <Typography sx={{ whiteSpace: "nowrap" }}>Last Name</Typography>
              </Grid>
              <Grid item xs={12} md={4} direction={"row"} spacing={2} style={{borderColor:textColor}}>
                <TextField
                  id="plain"
                  value={lastNamePlaceholder}
                  fullWidth
                  disabled={true}
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
                  style={{color:"white", borderColor:"white", textColor:"white",}}
                  value={displayNamePlaceholder}
                  fullWidth
                  disabled={true}
                />
              </Grid>
            </Grid>
            {/* <Button
                  variant="outline"
                  sx={{
                    textAlign: "center",
                    backgroundColor: "black",
                    margin: "0 auto",
                    color: "white",
                    ":hover": {
                      bgcolor: "white",
                      color: "black",
                    },
                  }}
                >
                  Save Changes
                </Button> */}
          </Grid>
        </CardContent>
      </Card>
      <BasicModal isOpen={showModal} onClose={() => setshowModal(false)} />
    </Stack>
  );
};

export default ProfileDetailScreen;
