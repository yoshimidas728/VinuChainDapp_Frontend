import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isOpen, onClose, handleSave }) {
  
  const nav = useNavigate();

  return (
    <div>
    
      <Modal
      sx={{width:"auto"}}
      open={isOpen} 
      onClose={onClose}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to submit this form 
          </Typography>
          <Stack
          mt={4}
          mb={4}
          sx={{
            display: "flex",
           justifyContent:"center",
           gap:"20px",
            
            flexDirection: "row",
          }}
        >
          <Button
            onClick={() => {
              if(handleSave){
                handleSave()
                return;
              }else {
                nav("/")
              }
            }}
            variant="outline"
            sx={{
              
              backgroundColor: "black",
            
              color: "white",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            Save
          </Button>
          <Button
            onClick={onClose}
             variant="outline"
             sx={{
              
               backgroundColor: "black",
              
               color: "white",
               ":hover": {
                 bgcolor: "white",
                 color: "black",
               },
             }}
             
          >
            Cancel
          </Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}