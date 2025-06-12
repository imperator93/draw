import { useRef, useState } from "react";
import style from "./App.module.css";
import { DrawArea } from "./Components/DrawArea";
import { Pallete } from "./Components/Pallete";

export const App = () => {
  // const conString: string = "ws://localhost:5010";
  // const wsRef = useRef<WebSocket>(new WebSocket(conString));
  // const { current: ws } = wsRef;

  // ws.addEventListener("open", () => {
  //   console.log("connection open");
  //   ws.send("test");
  // });

  // ws.addEventListener("message", ({ data }) => {
  //   console.log(data);
  //   ws.close();
  // });
  const [area, setArea] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [positions, setPositions] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  console.log(positions);

  const [mousePressed, setMousePressed] = useState(false);
  const [pallete, setPallete] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

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
