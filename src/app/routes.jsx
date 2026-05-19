import { createHashRouter } from "react-router";
import Layout from "./components/Layout";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
  },
]);
