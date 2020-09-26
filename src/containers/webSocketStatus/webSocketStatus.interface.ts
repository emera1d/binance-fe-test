import { SortBy } from "@app-core/interface";
import { WsStateEnum } from "@app-core/interface";

export interface WebSocketStatusProps {
  state: WsStateEnum;
  messageCount: number;
  autoReconnect: boolean;
  WsConnect: () => void;
  WsDisconnect: () => void;
  toggleAutoReconnect: () => void;
}
