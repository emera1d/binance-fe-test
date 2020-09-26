import React from "react";
import ProductListWidget from "../productListWidget";
import WebSocketStatus from "../webSocketStatus";

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <WebSocketStatus />
        <ProductListWidget />
      </div>
    );
  }
}
