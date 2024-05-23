import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/layout";
import LoginPage from "./pages/login";
import { protectedRouteLoader } from "./pages/(protected)/loader";
import ProtectedLayout from "./pages/(protected)/layout";
import ProfileLayout from "./pages/(protected)/profile/layout";
import HomeLayout from "./pages/(protected)/home/layout";
import ErrorPage from "./pages/error";
import { lazy } from "react";
import { loginLoader } from "./pages/login/loader";
import TownHallPage from "./pages/(protected)/townhall";
import TownHallLayout from "./pages/(protected)/townhall/layout";
import TownHallCameraPage from "./pages/(protected)/townhall/camera";
import CSRLayout from "./pages/(protected)/tamboon/layout";
import RedeemHistoryLayout from "./pages/(protected)/redeem-history/layout";
import RedeemLayout from "./pages/(protected)/redeem/layout";
import DetailsPage from "./pages/(protected)/tamboon/detailPage";
import JoinActivityPage from "./pages/(protected)/tamboon/JoinPage";
import RedeemDetail from "./pages/(protected)/redeem/components/RedeemModal";
import ConfirmModal from "./pages/(protected)/redeem/components/ConfirmModal";
import RedeemSuccessModal from "./pages/(protected)/redeem/components/SuccessModal";
import TamboonHistory from "./pages/(protected)/tamboon/TamboonHistory";

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
            element: <HomeLayout />,
            children: [
              {
                path: "",
                Component: lazy(() => import("./pages/(protected)/home")),
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
            ],
          },
          {
            path: "/redeem-history",
            element: <RedeemHistoryLayout />,
            children: [
              {
                path: "",
                Component: lazy(
                  () => import("./pages/(protected)/redeem-history")
                ),
              },
            ],
          },
          {
            path: "/csr",
            element: <CSRLayout />,
            children: [
              {
                path: "",
                Component: lazy(() => import("./pages/(protected)/tamboon")),
              },
              {
                path: ":id",
                element: <DetailsPage />,
              },
              {
                path: "join/:id",
                element: <JoinActivityPage />,
              },
              {
                path: "history/:id",
                element: <TamboonHistory />,
              },
            ],
          },
          {
            path: "/redeem",
            element: <RedeemLayout />,
            children: [
              {
                path: "",
                Component: lazy(() => import("./pages/(protected)/redeem")),
              },
              {
                path: "show/:id",
                element: <RedeemDetail isOpen={true} />,
              },
              {
                path: "confirm/:id",
                element: <ConfirmModal isOpen={true} />,
              },
              {
                path: "success/:id",
                element: <RedeemSuccessModal isOpen={true} />,
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
