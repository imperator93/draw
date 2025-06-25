import { useEffect, useState } from "react";

import { DrawArea } from "./Components/DrawArea";
import { Pallete } from "./Components/Pallete";

import style from "./App.module.css";
import { ChatArea } from "./Components/ChatArea";

export const App = ({ ws }: { ws: WebSocket }) => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      setConnection(true);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h1 className={style["main-title"]}>DRAW</h1>
      <div style={{ height: "100%", display: "flex" }}>
        <DrawArea connection={connection} ws={ws} />
        <ChatArea ws={ws} />
      </div>
      <Pallete />
    </div>
  );
};
