import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditDetailsScreen from "./EditDetailsScreen";

const Profile = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    displayName: Yup.string().required("Display Name is required"),
  });
  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  return (
    <div>
      <EditDetailsScreen formik={formik} />
    </div>
  );
};

export default Profile;
