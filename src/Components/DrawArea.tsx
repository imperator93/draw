import { useEffect, useRef, useState } from "react";

export const DrawArea = () => {
  const canvasReff = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleDraw = (ctx: CanvasRenderingContext2D) => {
    if (mousePressed) ctx.lineTo(positions.x, positions.y);
    else ctx.moveTo(positions.x, positions.y);
    ctx.stroke();
  };

  const handlePickColour = () => {};

  const handleMouseOver = (event: React.MouseEvent) => {
    setPositions((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY - 35,
    }));
  };

  useEffect(() => {
    const listener = () => {
      setArea({ width: innerWidth, height: window.innerHeight - 100 });
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  useEffect(() => {
    if (canvasReff.current) {
      const ctx = canvasReff.current.getContext("2d");
      if (ctx) {
        handleDraw(ctx);
      }
    }
  });

  console.log("render");
  return (
    <div ref={wrapperRef} style={{ width: "100vw" }}>
      <canvas
        onMouseDown={() => setMousePressed(true)}
        onMouseUp={() => setMousePressed(false)}
        onMouseMove={(event) => {
          handleMouseOver(event);
        }}
        width={area.width}
        height={area.height}
        id="canvas"
        ref={canvasReff}
      />
    </div>
  );
};
