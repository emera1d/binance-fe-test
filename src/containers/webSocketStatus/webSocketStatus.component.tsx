import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { debounce } from "@material-ui/core";
import { WsStateEnum } from "@app-core/interface";
import { WebSocketStatusProps } from "./webSocketStatus.interface";
import { Container, Button, Checkbox } from "./webSocketStatus.styled";

class WebSocketStatus extends React.Component<WebSocketStatusProps> {
  render() {
    const props = this.props;

    return (
      <Container>
        <div>WebSocket status: {this.getStatusText(props.state)}</div>
        <div>Message count: {props.messageCount}</div>

        <div>
          <Button onClick={props.WsConnect} disabled={props.state !== WsStateEnum.CLOSED}>
            connect
          </Button>
          <Button onClick={props.WsDisconnect} disabled={props.state !== WsStateEnum.CONNECTED}>
            disconnect
          </Button>
          <FormControlLabel
            control={<Checkbox checked={props.autoReconnect} onChange={props.toggleAutoReconnect} name="reconnect" />}
            label="Auto reconnect"
          />
        </div>
      </Container>
    );
  }

  getStatusText(state: WsStateEnum) {
    switch (state) {
      case WsStateEnum.CONNECTING:
        return "connecting ...";
      case WsStateEnum.CONNECTED:
        return "connected";
      case WsStateEnum.CLOSED:
        return "closed";
      case WsStateEnum.CLOSING:
        return "closing ...";
    }
  }
}

export { WebSocketStatus };
