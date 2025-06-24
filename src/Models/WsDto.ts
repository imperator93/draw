import type { ChatModel } from "./ChatModel";
import type { PositionsModel } from "./PositionsModel";

export type WsDto =
  | { type: "chat"; data: ChatModel }
  | { type: "game"; data: PositionsModel };
