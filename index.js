import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Home } from "./home.js";

const re = document.getElementById("root");
const root = createRoot(re);

root.render(<Home />);
