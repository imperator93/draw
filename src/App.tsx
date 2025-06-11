import style from "./App.module.css";
import { DrawArea } from "./Components/DrawArea";
import { Pallete } from "./Components/Pallete";

export const App = () => {
  return (
    <div>
      <h1 className={style["main-title"]}>DRAW</h1>
      <DrawArea />
      <Pallete />
    </div>
  );
};
