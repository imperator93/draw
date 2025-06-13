import { useEffect, useRef, useState } from "react";
import style from "./App.module.css";
import { DrawArea } from "./Components/DrawArea";
import { Pallete } from "./Components/Pallete";
import { GetValidJson } from "./Helpers/GetValidJson";

const conString: string = "ws://localhost:5010";
const ws = new WebSocket(conString);

export const App = () => {
  const [connection, setConnection] = useState(false);
  const [area, setArea] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [positions, setPositions] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [mousePressed, setMousePressed] = useState(false);
  const [pallete, setPallete] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  useEffect(() => {
    ws.onopen = () => setConnection(true);
    if (connection) {
      ws.send(JSON.stringify({ ...positions, mousePressed }));
      ws.onmessage = ({ data }) => {
        const message = GetValidJson(data);
        console.log(JSON.parse(message));
      };
    }
  }, [positions, mousePressed, connection]);

  return (
    <div>
      <h1 className={style["main-title"]}>DRAW</h1>
      <DrawArea
        area={area}
        setArea={setArea}
        positions={positions}
        setPositions={setPositions}
        mousePressed={mousePressed}
        setMousePressed={setMousePressed}
        pallete={pallete}
        setPallete={setPallete}
      />
      <Pallete />
    </div>
  );
};
