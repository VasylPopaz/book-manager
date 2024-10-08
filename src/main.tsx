import ReactDOM from "react-dom/client";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { App } from "./components";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ToastContainer
      autoClose={2500}
      transition={Zoom}
      theme="dark"
      style={{ zIndex: 999 }}
      closeOnClick={true}
    />
  </>
);
