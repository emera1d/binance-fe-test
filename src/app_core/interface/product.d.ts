interface IProduct {
  [index: string]: any;

  baseAsset: string;
  quoteAsset: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  currentPrice: number;
  parentMarket: string;
  parentMarketCategory: string;
  volume: number;

  change: number;
  pair: string;
}

type Pair = string;
type ProductsMap = Map<Pair, IProduct>;

interface IProductChanges {
  epoch: number;
  latestPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;

  pair: string; // pair "BNBBTC",
}

interface IServerProduct {
  an:   string;    // an: "BNB"         // asset name
  as:   number;    // as: 1927035.25
  b:    string;    // b: "BNB"          // base asset
  ba:   string;    // ba: ""
  c:    number;    // c: 0.0020715      // latest price
  cs:   number;    // cs: 152665937
  etf:  boolean;   // etf: false
  h:    number;    // h: 0.002125       // high price
  i:    number;    // i: 0.01
  l:    number;    // l: 0.0019355      // low price
  o:    number;    // o: 0.0019834      // open price
  pm:   string;    // pm: "BTC"         // parent market
  pn:   string;    // pn: "BTC"         // category of the parent market
  q:    string;    // q: "BTC"          // quote asset
  qa:   string;    // qa: "฿"
  qn:   string;    // qn: "Bitcoin"     // ? quote asset name
  qv:   number;    // qv: 3863.98007305
  s:    string;    // s: "BNBBTC"
  st:   string;    // st: "TRADING"
  ts:   number;    // ts: 1e-7
  v:    number;    // v: 1927035.25     // ? Volume
  y:    number;    // y: 0
}

interface IServerProductChanges {
  E: number; // epoch // 1600764253411,
  s: string; // pair "BNBBTC",
  c: number; // latest price
  o: number; // open price
  h: number; // high price
  l: number; // low price
  v: number; // volume "1591616.13000000",
  q: number; // qv ?! "3570.49574920"
}
