import { serverProductChangesToClientProductChanges } from "@app-core/helpers";
import {
  connect,
  WS_CONNECT,
  WS_CLOSE,
  WS_CONNECTED,
  WS_CLOSED,
  WS_MESSAGE,
} from "../modules/webSocket";
import { APPLY_CHANGES } from "../modules/productList";

const WS_URL = "wss://stream.binance.com/stream?streams=!miniTicker@arr";
const RECONNECT_DELAY = 1000;

let websocket: any;
let reconnectTimeoutId: any; // number | null

export const webSocket = (store: any) => (next: any) => (action: any) => {
  const dispatch = store.dispatch;

  switch (action.type) {
    case WS_CONNECT:
      if (!websocket) {
        if (reconnectTimeoutId) {
          clearTimeout(reconnectTimeoutId);
          reconnectTimeoutId = null;
        }

        websocket = new WebSocket(WS_URL);
        websocket.onopen = () => dispatch({ type: WS_CONNECTED });
        websocket.onclose = () => {
          dispatch({ type: WS_CLOSED });

          if (store.getState().webSocket.autoReconnect) {
            reconnectTimeoutId = setTimeout(() => {
              reconnectTimeoutId = null;

              dispatch({
                type: WS_CONNECT,
              });
            }, RECONNECT_DELAY);
          }

          websocket = null;
        };
        websocket.onmessage = (event: any) => {
          let data: any = {};

          dispatch({
            type: WS_MESSAGE,
          });

          try {
            data = JSON.parse(event.data);
          } catch (er) {
            console.error("Error parse WebSocket message");
          }

          // TODO WS stream
          const stream = data.stream;
          const streamData = data.data;

          if (stream === "!miniTicker@arr") {
            dispatch({
              type: APPLY_CHANGES,
              payload: {
                changes: streamData.map(serverProductChangesToClientProductChanges),
              },
            });
          }
        };
      }
      break;

    case WS_CLOSE:
      websocket.close();
      break;

    default:
      break;
  }

  return next(action);
};
