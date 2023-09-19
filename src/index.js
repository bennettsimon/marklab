import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Toaster } from "react-hot-toast";

import "./index.css";
import Router from "./page";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Import Fontawesome Icons
library.add(fas, fab);

root.render(
  <BrowserRouter>
    {/* 全局弹出提示 */}
    <Toaster />
    {/* 路由 */}
    <Router />
  </BrowserRouter>
);
