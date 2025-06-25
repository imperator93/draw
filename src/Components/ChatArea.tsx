import style from "./ChatArea.module.css";

export const ChatArea = ({ ws }: { ws: WebSocket }) => {
  return <div className={style["chat-area-container"]}></div>;
};
