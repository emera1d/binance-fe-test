export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
};

// https://html.spec.whatwg.org/multipage/web-sockets.html#dom-websocket-readystate
export enum WsStateEnum {
  CONNECTING,
  CONNECTED,
  CLOSING,
  CLOSED,
}

export enum ParentMarketEnum {
  ALTS = 'ALTS',
  BNB = 'BNB',
  BTC = 'BTC',
  USD = 'USDⓈ',
}

export type SortBy = {
  field: string;
  order: SortOrderEnum;
}
