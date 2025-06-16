import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "./index.css";
const conString: string = "ws://localhost:5010";
const ws = new WebSocket(conString);

createRoot(document.getElementById("root")!).render(<App ws={ws} />);
