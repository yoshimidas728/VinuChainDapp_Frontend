import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import ProfileTabs from "../../components/Tabs/Tabs";
import axios from "../../axios/AxiosConfig";
import Toast  from "react-hot-toast";

import {
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { theme } = useSelector((state) => state.themeReducer);

  const nav = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  let [userDetails, setUserDetails] = useState({
    id:"",
    firstName:"",
    lastName:"",
    displayName:"",
    avatar:"",
  });
  console.log(userDetails)
  // useEffect(async () => {
  //   if (!selectedFile) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setPreview(objectUrl);
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("running");
      setSelectedFile(undefined);
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64String = reader.result;
        // Do something with the base64String, like send it to an API or display it in the UI
        console.log(base64String);
        let payload = {
          image:base64String
        }
        const token = localStorage.getItem("token");
        const response = await axios.post('http://182.176.170.176:2500/api/v1/user/updateImage',
          payload
        );
        const data = response.data;
        
        // Process the data or set it to state
        console.log(data);
        Toast.success(data.message)
        
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    reader.readAsDataURL(file);

    // I've kept this example simple by using the first image instead of multiple
    // console.log(e.target.files[0]);
    // setSelectedFile(e.target.files[0]);
    // console.log(selectedFile);
  };
  const inputFileRef = useRef(null);
  console.log(userDetails)
  let url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODgikvgcP-cKJ4XFH0nO-OaFPzVNKT9kzjg&usqp=CAU";
  
  useEffect(() => {
    const id = localStorage.getItem("id");
    axios.get('http://182.176.170.176:2500/api/v1/user/getuser?id='+id)
      .then(response => {
        // Handle the successful response here
        console.log(response.data.data); // For example, log the response data
        // You can perform any additional logic here based on the response
        const userData = response.data.data;
        setUserDetails({
          id:userData.id,
          firstName:userData.firstName,
          lastName:userData.lastName,
          displayName:userData.displayName,
          avatar:userData.avatar,
        });
        return;
      })
      .catch(error => {
        // Handle errors here if the request fails
        return console.error('Error:', error);
    });
  }, [])
  return (
    <>
      <Container maxWidth="xl" 
        style={{
          width: "100%", padding: "0px",
          background: (theme === 'black' ? '#27374D' : '#DCF3FC'),
          color:(theme === 'black' ? '#E4E4E4' : '')
        }}
      >
        <Grid
          xs={12}
          py={3}
          px={3}
          sx={{ width: "inherit" }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Stack>
              {selectedFile ? (
                <Avatar
                  src={userDetails.avatar?userDetails.avatar:preview}
                  sx={{ width: 56, height: 56, cursor: "pointer" }}
                  alt="Remy Sharp"
                />
              ) : (
                <Avatar
                  src={userDetails.avatar?userDetails.avatar:url}
                  onClick={() => inputFileRef.current.click()}
                  sx={{ width: 56, height: 56, cursor: "pointer" }}
                  alt="Remy Sharp"
                />
              )}
              <input
                ref={inputFileRef}
                type="file"
                id="uploadedFile"
                accept=".png,.jpg,.jpeg,.gif"
                name="uploadedFile"
                // multiple={true}
                style={{ display: "none" }}
                onChange={onSelectFile}
              />{" "}
            </Stack>
            <Stack mt={1}>
              <Typography
                sx={{ fontWeight: "bold", }}
                variant="h6"
              >
                {userDetails.firstName?(userDetails.firstName+ " " +userDetails.lastName):"Marking Cent"} {" "}
              </Typography>
              <Typography sx={{ fontSize: "12px", }} variant="p">
              {userDetails.displayName?(userDetails.displayName):(`User ` + userDetails.id)}
                
              </Typography>
            </Stack>
          </Grid>

          {/* <Grid mr={3} sx={{ display: "flex", gap: "1rem" }}>
            <Stack sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "bold", }}
                variant="p"
              >
                0
              </Typography>
              <Typography  variant="p">
                Followers
              </Typography>
            </Stack>
            <Stack sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "bold", }}
                variant="p"
              >
                0
              </Typography>
              <Typography variant="p">
                Following
              </Typography>
            </Stack>
          </Grid> */}
        </Grid>

        <Stack>
          <ProfileTabs />
        </Stack>
      </Container>
    </>
  );
};

export default Profile;
