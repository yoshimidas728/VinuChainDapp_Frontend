import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { becomeAuthor } from "../../store/autorization/actions";
import { useDispatch } from "react-redux";

const authorizationSchema = Yup.object().shape({
  blogAbout: Yup.string().required("Please Fill the statment"),
  email: Yup.string().required("Please Fill the statment"),
  blogPosted: Yup.string(),
  agree1: Yup.boolean().oneOf([true], "You must agree to continue."),
  agree2: Yup.boolean().oneOf([true], "You must agree to continue."),
  agree3: Yup.boolean().oneOf([true], "You must agree to continue."),
  agree4: Yup.boolean().oneOf([true], "You must agree to continue."),
  consent: Yup.string()
    .required("Please fill the text.")
    .matches(/^(I agree)$/, 'Text must be "I agree"'),
});
const AutorizationScreen = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      blogAbout: "",
      email: "",
      blogPosted: "",
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
      consent: "",
    },
    validationSchema: authorizationSchema,
    onSubmit: (values) => {
      // handle form submission here
      const payload = {
        a1: values.blogAbout,
        a2: values.email,
        a3: values.blogPosted,
        a4: true,
        a5: values.agree1,
        a6: values.agree2,
        a7: values.agree3,
        a8: values.agree4,
        a9: values.consent,
      };
      console.log(
        "🚀 ~ file: AutorizationScreen.jsx:52 ~ AutorizationScreen ~ payload:",
        payload
      );
      dispatch(becomeAuthor(payload));
      formik.resetForm();
    },
  });
  return (
    <Stack minHeight={"80vh"} px={"3em"} py={"2em"} alignItems={"center"}>
      <Typography variant={"h4"}>Author Application</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography>
            During authorship is limited whilst the site is in beta. To become
            an author please fill in this form below:
          </Typography>
          <TextField
            error={formik.errors.blogAbout}
            id="outlined-error"
            label="What do you want to blog about on Vite?"
            name="blogAbout"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blogAbout}
          />
          {formik.touched.blogAbout && formik.errors.blogAbout ? (
            <Typography>{formik.errors.blogAbout}</Typography>
          ) : null}
          <Stack>
            <Typography>
              We may contact you with regard to your application.
            </Typography>
            <TextField
              error={formik.errors.email}
              id="outlined-error"
              label="We may contact you with regard to your application.
              Please provide an email address we can contact you on in the field below:"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Typography>{formik.errors.email}</Typography>
            ) : null}
          </Stack>
          <Stack>
            <Typography>
              Do you have any writing examples or already have a blog posted
              somewhere else online?
            </Typography>
            <TextField
              error={formik.errors.blogPosted}
              id="outlined-error"
              label="If so please provide links to your work below, comma separated:"
              name="blogPosted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.blogPosted}
            />
          </Stack>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              onChange={formik.handleChange}
              label="I agree I can only publish my original content or content that I own the copyright for on Vite."
              name="agree1"
              value={formik.values.agree1}
              checked={formik.values.agree1}
            />
            {formik.touched.agree1 && formik.errors.agree1 ? (
              <Typography color={"red"}>{formik.errors.agree1}</Typography>
            ) : null}
            <FormControlLabel
              control={<Checkbox />}
              onChange={formik.handleChange}
              checked={formik.values.agree2}
              value={formik.values.agree2}
              name="agree2"
              label="I agree my posts and blogs can be deleted from Publish0x without warning if I break any of the published rules."
            />
            {formik.touched.agree2 && formik.errors.agree2 ? (
              <Typography color={"red"}>{formik.errors.agree2}</Typography>
            ) : null}
            <FormControlLabel
              control={<Checkbox />}
              value={formik.values.agree3}
              onChange={formik.handleChange}
              checked={formik.values.agree3}
              name="agree3"
              label="I agree that I will lose my authorship privileges and my account will get banned without warning if I break any of the published rules"
            />
            {formik.touched.agree3 && formik.errors.agree3 ? (
              <Typography color={"red"}>{formik.errors.agree3}</Typography>
            ) : null}
            <FormControlLabel
              control={<Checkbox />}
              value={formik.values.agree4}
              onChange={formik.handleChange}
              checked={formik.values.agree4}
              name="agree4"
              label="I agree that all the earnings from my posts will be removed without warning if I break any of the published rules."
            />
            {formik.touched.agree4 && formik.errors.agree4 ? (
              <Typography color={"red"}>{formik.errors.agree4}</Typography>
            ) : null}
          </FormGroup>
          <Stack>
            <Typography>
              Finally, we require that you confirm that you have read and agreed
              to the statements above by entering "I agree" in the field below.
            </Typography>
            <TextField
              error={formik.errors.consent}
              id="outlined-error"
              name="consent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.consent}
            />
            {formik.touched.consent && formik.errors.consent ? (
              <Typography color={"red"}>{formik.errors.consent}</Typography>
            ) : null}
          </Stack>
          <Button
            type="submit"
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
            Become Authorized
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AutorizationScreen;
