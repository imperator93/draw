import { useEffect, useRef, useState, type RefObject } from "react";
import type { PositionsModel } from "../Models/PositionsModel";
import { GetValidJson } from "../Helpers/GetValidJson";
import type { WsDto } from "../Models/WsDto";

//to see how many renders... needs to be reference so it writes to the same address
// const r = { i: 0 };

export const DrawArea = ({
  ws,
  connection,
}: {
  ws: WebSocket;
  connection: boolean;
}) => {
  // console.log(r);
  // r.i += 1;

  //1000ms/30 = 33ms delay for the timeout function so 30 frames, could also set to be 16 for 60 fps
  //set to lower for better tracking will overload the server perhaps
  const framesPerSecond = 33;

  const canvasReff = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleMouseOver = (event: React.MouseEvent) => {
    if (ws.OPEN) {
      setPositions((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY - 35,
      }));

      ws.send(
        JSON.stringify({
          type: "game",
          positions: positions,
        })
      );

      ws.onmessage = ({ data }: { data: string }) => {
        const message = JSON.parse(GetValidJson(data));
        console.log(message);
        if (message.type == "game") {
          handleDraw(canvasReff, message.positions);
        }
      };
    }
  };

  const handleDraw = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    data: PositionsModel
  ) => {
    if (canvasRef.current) {
      console.log(data);
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        if (data.mousePressed) ctx.lineTo(data.x, data.y);
        else ctx.moveTo(data.x, data.y);
        ctx.stroke();
      }
    }
  };

  const handlePickColour = () => {};

  useEffect(() => {
    const listener = () => {
      setArea({ width: innerWidth - 200, height: window.innerHeight - 100 });
    };
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [setArea]);

  return (
    <div ref={wrapperRef} style={{ width: "100vw" }}>
      <canvas
        onMouseDown={() =>
          setPositions((prev) => ({ ...prev, mousePressed: true }))
        }
        onMouseUp={() =>
          setPositions((prev) => ({ ...prev, mousePressed: false }))
        }
        onMouseMove={(event) => {
          setTimeout(() => {
            window.requestAnimationFrame(() => {
              handleMouseOver(event);
            });
          }, framesPerSecond);
        }}
        width={area.width}
        height={area.height}
        id="canvas"
        ref={canvasReff}
      />
    </div>
  );
};
