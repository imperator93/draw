import { useEffect, useState } from "react";

import { DrawArea } from "./Components/DrawArea";
import { Pallete } from "./Components/Pallete";

import { GetValidJson } from "./Helpers/GetValidJson";

import style from "./App.module.css";
import type { PositionsModel } from "./Models/PositionsModel";

export const App = ({ ws }: { ws: WebSocket }) => {
  const [connection, setConnection] = useState<{
    connected: boolean;
    conId: string;
  }>({ connected: false, conId: "" });
  const [area, setArea] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [positions, setPositions] = useState<PositionsModel>({
    mousePressed: false,
    x: 0,
    y: 0,
  });

  const [pallete, setPallete] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  useEffect(() => {
    ws.onopen = () => {
      if (!connection.connected)
        setConnection((prev) => ({ ...prev, connected: true }));
    };
  }, [ws, setConnection, connection]);

  const handleMouseOver = (event: React.MouseEvent) => {
    setPositions((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY - 35,
    }));

    if (connection.connected) {
      ws.send(JSON.stringify(positions));
      ws.onmessage = ({ data }: { data: string }) => {
        const message = JSON.parse(GetValidJson(data));
      };
    }
  };

  return (
    <div>
      <h1 className={style["main-title"]}>DRAW</h1>
      <DrawArea ws={ws} />
      <Pallete />
    </div>
  );
};
