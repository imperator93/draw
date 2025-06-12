import { useEffect, useRef, type SetStateAction } from "react";

export const DrawArea = ({
  area,
  setArea,
  positions,
  setPositions,
  mousePressed,
  setMousePressed,
  pallete,
  setPallete,
}: {
  area: { width: number; height: number };
  setArea: React.Dispatch<SetStateAction<typeof area>>;
  positions: { x: number; y: number };
  setPositions: React.Dispatch<SetStateAction<typeof positions>>;
  mousePressed: boolean;
  setMousePressed: React.Dispatch<SetStateAction<boolean>>;
  pallete: { red: number; green: number; blue: number };
  setPallete: React.Dispatch<SetStateAction<typeof pallete>>;
}) => {
  const canvasReff = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDraw = (ctx: CanvasRenderingContext2D) => {
    if (mousePressed) ctx.lineTo(positions.x, positions.y);
    else ctx.moveTo(positions.x, positions.y);
    ctx.stroke();
  };

  const handlePickColour = () => {};

  //WTF TO DO HERE
  useEffect(() => {}, []);

  const handleMouseOver = (event: React.MouseEvent) => {
    const t = setTimeout(() => {
      setPositions((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY - 35,
      }));
    }, 10);
    clearTimeout(t);
  };

  useEffect(() => {
    const listener = () => {
      setArea({ width: innerWidth, height: window.innerHeight - 100 });
    };
    listener();
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
