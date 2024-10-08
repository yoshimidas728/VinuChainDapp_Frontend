import { Stack } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../layout/Layout";
import LoginScreen from "../../screens/authentication/login/LoginScreen";
import ForgotPasswordScreen from "../../screens/authentication/forgetPassword/index";
import SignUpScreen from "../../screens/authentication/signup/SignUpScreen";
import Editor from "../../screens/editor/Editor";
import BlogsScreen from "../../screens/blogs/BlogsScreen";
import DesktopScreen from "../../screens/desktop/DesktopScreen";
import ErrorPage from "../../screens/ErrorPage";
import EditDetailsScreen from "../../screens/profile/EditDetailsScreen";
import ProfileDetailScreen from "../../screens/profile/ProfileDetailScreen";
import Profile from "../../screens/profile/Profile";
import PrivateUserRoutes from "./PrivateUserRoutes";
import PrivateAdminRoutes from "./PrivateAdminRoutes";
import AdminLoginScreen from "../../screens/authentication/login/AdminLoginScreen";
import AutorizationScreen from "../../screens/blogs/AutorizationScreen";
import LatestTrendsScreen from '../../screens/trends/index'
import ResetPassword from '../../screens/authentication/resetPassword/index'
import EmailVerification from '../../screens/authentication/emailVerification/index'
import { BlogsDashboard } from '../../screens/BlogsDashboard/BlogsDashboardPage'
import WhatsNewPage from '../../screens/whatsNew'

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Layout>
        <DesktopScreen />
      </Layout>
    ),
  },
  {
    path: "/faqs",
    errorElement: <ErrorPage />,
    element: (
      <Layout>
        <WhatsNewPage />
      </Layout>
    ),
  },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: (
      <PrivateAdminRoutes>
        <Layout>
          <DesktopScreen />
        </Layout>
      </PrivateAdminRoutes>
    ),
  },
  {
    path: "/posts",
    errorElement: <ErrorPage />,
    element: (
      <PrivateAdminRoutes>
        <Layout>
          <DesktopScreen />
        </Layout>
      </PrivateAdminRoutes>
    ),
  },
  {
    path: "/distribute",
    errorElement: <ErrorPage />,
    element: (
      <PrivateAdminRoutes>
        <Layout>
          <DesktopScreen />
        </Layout>
      </PrivateAdminRoutes>
    ),
  },
  {
    path: "/edit-profile",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <EditDetailsScreen />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/blogs-dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <BlogsDashboard />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/profile-detail",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <Profile />
        </Layout>
      </PrivateUserRoutes>
    ),
  },

  {
    path: "/blogs/:id",
    errorElement: <ErrorPage />,
    element: (
        <Layout>
          <BlogsScreen />
        </Layout>
    ),
  },
  {
    path: "/author-consent",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <AutorizationScreen />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/trends",
    errorElement: <ErrorPage />,
    element: (
      // <PrivateUserRoutes>
        <Layout>
          <LatestTrendsScreen />
        </Layout>
      // </PrivateUserRoutes>
    ),
  },
  {
    path: "/reset-password/:id",
    errorElement: <ErrorPage />,
    element: (
      <ResetPassword />
    ),
  },
  {
    path: "/email-verification/:id",
    errorElement: <ErrorPage />,
    element: (
      <EmailVerification />
    ),
  },
  {
    path: "/trends/category/:id",
    errorElement: <ErrorPage />,
    element: (
      // <PrivateUserRoutes>
        <Layout>
          <LatestTrendsScreen />
        </Layout>
      // </PrivateUserRoutes>
    ),
  },
  {
    path: "/story",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <Editor />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/story/:id",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <Editor />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/profile",
    errorElement: <ErrorPage />,
    element: (
      <PrivateUserRoutes>
        <Layout>
          <Profile />
        </Layout>
      </PrivateUserRoutes>
    ),
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <LoginScreen />,
  },
  {
    path: "/forgot-password",
    errorElement: <ErrorPage />,
    element: <ForgotPasswordScreen />,
  },
  {
    path: "/admin-login",
    errorElement: <ErrorPage />,
    element: <AdminLoginScreen />,
  },
  {
    path: "/signup",
    errorElement: <ErrorPage />,
    element: <SignUpScreen />,
  },
]);
const MainRoutes = () => {
  return (
    <>
      <Stack height={"100vh"}>
        <RouterProvider router={routes} />
        <Toaster />
      </Stack>
    </>
  );
};

export default MainRoutes;
