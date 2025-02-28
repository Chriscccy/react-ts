// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.scss";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
// import "@ant-design/v5-patch-for-react-19";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import AppRouter from "./router"; // 从 AppRouter 导入路由配置
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter /> {/* 使用 AppRouter 替代直接导入的 router */}
  </StrictMode>
);
