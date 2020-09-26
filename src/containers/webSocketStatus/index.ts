import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  connect as WsConnect,
  disconnect as WsDisconnect,
  toggleAutoReconnect
} from "../../redux/modules/webSocket";
import { WebSocketStatusProps } from "./webSocketStatus.interface";
import { WebSocketStatus } from "./webSocketStatus.component";

const mapStateToProps = (store: any) => {
  const { webSocket } = store;

  return {
    state: webSocket.state,
    messageCount: webSocket.messageCount,
    autoReconnect: webSocket.autoReconnect,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      WsConnect,
      WsDisconnect,
      toggleAutoReconnect,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebSocketStatus);
