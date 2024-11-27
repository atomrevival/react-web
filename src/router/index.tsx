import { createBrowserRouter } from "react-router-dom";

import { Start } from "../app/pages/Start";
import { Root } from "../app/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Start />,
      },
    ],
  },
]);
