import React, { useState } from "react";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/post/actions";
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from "react-router";
import { editOwnPost, clearState as clearStateRedux } from '../../store/dashboard/actions';
import { toast } from 'react-hot-toast'

const Editor = () => {
  const { theme } = useSelector((state) => state.themeReducer);

  const location = useLocation();
  const navigate = useNavigate();

  const { blogs } = useSelector((state) => state?.dashboardReducer)
  const role = localStorage.getItem("role");

  let singleBlog = {};

  if(location?.pathname?.split('/')[2] !== ''){
    singleBlog = blogs?.find(({id}) => id == location?.pathname?.split('/')[2])
  }

  const [value, setValue] = useState(singleBlog?.description || "");
  const [ title, setTitle ] = useState(singleBlog?.title || '')
  const [ tags, setTags ] = useState(singleBlog?.tags || []);
  const [ imgDate, setImageData ] = useState(singleBlog?.image || []);
  const [ backupValue, setBackupValue ] = useState(singleBlog?.description || "");
  const [ some , setSome ] = useState('');
  const [tagss, setTagss] = useState(['Technology', 'Innovation', 'Finance', 'News', 'Lifestyle', 'Entertainment', 'Sports', 'Arts', 'Educations', 'Travel'])
  const editorConfig = {
    // CKEditor configuration options
    toolbar: [
      "bold",
      "italic",
      "underline",
      "bulletedList",
      "numberedList",
      "link", // Add a link button
      "image", // Add an image button
      "blockQuote",
    ],
    styles: [
      // Custom styles
      { data: "Padding 10px", element: "p", styles: { padding: "100px" } },
      { data: "Padding 20px", element: "p", styles: { padding: "200px" } },
    ],
  };
  const dispatch = useDispatch();

  const clearState = async () => {
    await setValue('')
    await setTitle('')
    await setTitle()
    await setTags([])
  }
  
  const handleSubmit = () => {
    if(!title){
      return toast.error("Blog title is required");
    }
    if(!backupValue){
      return toast.error("Empty blog can't be submitted");
    }
    if(tags.length==0){
      return toast.error("Tags are required");
    }
    if(location?.pathname?.split('/')[2] === undefined){
      let data = {
        title,
        desc: backupValue,
        tags: [...tags],
        words: value.length
      }
      dispatch(createPost(JSON.stringify(data)));
      clearState();
      setBackupValue('')
    }else {
      let data = {
        title,
        desc: backupValue,
        words: value.length,
        tags: [...tags],
        postId: parseInt(location?.pathname?.split('/')[2])
      }

      dispatch(editOwnPost(JSON.stringify(data)))
      toast.success("Successfully Updated Post");
      clearState()
      navigate('/blogs-dashboard')
    }
  };


  const modules = {
    toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['link', 'image', 'video'],

    ['clean'],                                         // remove formatting button
  ]};

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const tagsHandler = async (value, label) => {
    const founded = tags?.filter((s) => s === label)
    if(value && founded?.length === 0){
      await setTags([...tags, label])
    }else {
      const ss = tags?.filter((s) => s !== label)
      await setTags(ss)
    }
  }

  const ss = (content, delta, source, editor) => {
    setBackupValue(content);
    if(delta?.ops?.length > 0 && delta?.ops[1]?.insert?.image){
      setImageData([...imgDate , delta?.ops[1]?.insert?.image]);
    }else {
      setValue(editor.getText(content))
    }
  }

  return (
    <>
      <Container  sx={{ minHeight: "100vh" }} >
        {
          role !== 'Author' ? (
            <div style={{textAlign: 'center', marginTop:'9rem'}}>
              <Button
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
              onClick={() => navigate("/profile-detail")}
            >
              Become Authorized
            </Button>
            </div>
          ) : (
          <>
          <Grid>
          <TextField 
            id="outlined-basic"
            label="Blog Title"
            variant="outlined"
            style={{marginBottom: '3rem', marginTop: '2rem', width: '72rem'}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormGroup style={{display: 'contents'}}>
            {
              tagss?.map((ts) => {
                return (
                  <FormControlLabel control={<Checkbox checked={tags?.includes(ts)} {...label} size="small" onChange={(e) => tagsHandler(e.target.checked, ts)}/>} label={ts} style={{width: '15rem'}}/>
                )
              })
            }
          </FormGroup>
          <div>
            <ReactQuill
              placeholder="Description of Blog"
              theme="snow"
              onChange={ss}
              value={backupValue}
              className='quill-editor'
              modules={modules}
            />
          </div>
        </Grid>
        <Stack
          mt={4}
          mb={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Button
            sx={{
              borderRadius: "25px",
              whiteSpace: "nowrap",
              color: "white",
              bgcolor: "black",
              ":hover": {
                bgcolor: "white",
                color: "red",
              },
            }}
          >
            Save
          </Button>
          <Button
            sx={{
              borderRadius: "25px",
              color: "white",
              bgcolor: "black",
              ":hover": {
                bgcolor: "white",
                color: "red",
              },
            }}
            onClick={() => handleSubmit()}
          >
            Publish
          </Button>
        </Stack></>
          )
        }
      </Container>
    </>
  );
};

export default Editor;
