import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/layout";
import LoginPage from "./pages/login";
import { protectedRouteLoader } from "./pages/(protected)/loader";
import ProtectedLayout from "./pages/(protected)/layout";
import ProfileLayout from "./pages/(protected)/profile/layout";
import ErrorPage from "./pages/error";
import { lazy } from "react";
import { loginLoader } from "./pages/login/loader";
import TownHallPage from "./pages/(protected)/townhall";
import TownHallLayout from "./pages/(protected)/townhall/layout";
import TownHallCameraPage from "./pages/(protected)/townhall/camera";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedLayout />,
        loader: protectedRouteLoader,
        children: [
          {
            path: "/",
            element: <ProfileLayout />,
            children: [
              {
                path: "",
                Component: lazy(() => import("./pages/(protected)/profile")),
              },
              {
                path: "qr",
                Component: lazy(() => import("./pages/(protected)/profile/qr")),
              },
            ],
          },
          {
            path: "/qrcode",
            element: <TownHallLayout />,
            children: [
              {
                path: "",
                element: <TownHallPage />,
              },
              {
                path: "camera",
                element: <TownHallCameraPage />,
              },
            ],
          },
          {
            path: "/profile",
            element: <ProfileLayout />,
            children: [
              {
                path: "",
                Component: lazy(() => import("./pages/(protected)/profile")),
              },
              {
                path: "qr",
                Component: lazy(() => import("./pages/(protected)/profile/qr")),
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        loader: loginLoader,
        element: <LoginPage />,
      },
    ],
  },
]);
