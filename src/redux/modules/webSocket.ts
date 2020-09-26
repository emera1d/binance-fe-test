import { WsStateEnum } from "@app-core/interface";

export const WS_CONNECT = "websocket/connect";
export const WS_CLOSE = "websocket/close";
export const WS_CONNECTED = "websocket/connected";
export const WS_CLOSED = "websocket/closed";
export const WS_MESSAGE = "websocket/message";
export const WS_TOOGLE_RECONNECT = "websocket/toggleReconnect";

const initialState = {
  state: WsStateEnum.CLOSED,
  messageCount: 0,
  autoReconnect: true,
};

export default (state = initialState, action: any) => {
  const type = action.type;

  switch (type) {
    case WS_CONNECT:
      return {
        ...state,
        state: WsStateEnum.CONNECTING,
      };

    case WS_CONNECTED:
      return {
        ...state,
        state: WsStateEnum.CONNECTED,
      };

    case WS_CLOSE:
      return {
        ...state,
        state: WsStateEnum.CLOSING,
      };

    case WS_CLOSED:
      return {
        ...state,
        state: WsStateEnum.CLOSED,
      };

    case WS_MESSAGE:
      return {
        ...state,
        messageCount: state.messageCount + 1,
      };

    case WS_TOOGLE_RECONNECT:
      return {
        ...state,
        autoReconnect: !state.autoReconnect,
      };

    default:
      return state;
  }
};

export const connect = () => {
  return (dispatch: any) => {
    dispatch({
      type: WS_CONNECT,
    });
  };
};

export const disconnect = (code?: number) => {
  return (dispatch: any) => {
    dispatch({
      type: WS_CLOSE,
    });
  };
};

export const toggleAutoReconnect = () => {
  return (dispatch: any) => {
    dispatch({
      type: WS_TOOGLE_RECONNECT,
    });
  };
};
