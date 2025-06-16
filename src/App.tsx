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
    ws.onopen = () => setConnection((prev) => ({ ...prev, connected: true }));
    if (connection.connected) {
      ws.send(JSON.stringify({ ...positions }));
      ws.onmessage = ({ data }) => {
        const message = GetValidJson(data);
        console.log(JSON.parse(message));
      };
    }
  }, [positions, connection, ws]);
  return (
    <div>
      <h1 className={style["main-title"]}>DRAW</h1>
      <DrawArea
        area={area}
        setArea={setArea}
        positions={positions}
        setPositions={setPositions}
        pallete={pallete}
        setPallete={setPallete}
      />
      <Pallete />
    </div>
  );
};
