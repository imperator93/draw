import style from "./Pallete.module.css";

export const Pallete = () => {
  return (
    <div className={style["pallete"]}>
      <button>THICKNESS</button>
      <button>COLOUR</button>
      <button>ERASE ALL</button>
    </div>
  );
};
