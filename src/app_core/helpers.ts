export const getProductPriceChange = (product: IProduct): number => {
  let change;

  if (product.currentPrice === product.openPrice || !product.openPrice || !product.currentPrice) {
    change = 0;
  } else {
    change = Math.round((product.currentPrice - product.openPrice) /product.openPrice *10000) /100
  }

  return change;
};

export const serverProductToClientProduct = (serverProduct: IServerProduct): IProduct => {
  const product: IProduct = {
    baseAsset: serverProduct.b,
    quoteAsset: serverProduct.q,
    openPrice: serverProduct.o,
    highPrice: serverProduct.h,
    lowPrice: serverProduct.l,
    currentPrice: serverProduct.c,
    parentMarket: serverProduct.pm,
    parentMarketCategory: serverProduct.pn,
    volume: Math.floor(serverProduct.v), // TODO Round value

    change: 0,
    pair: serverProduct.b + serverProduct.q,
  };

  product.change = getProductPriceChange(product);

  return product;
};

export const serverProductChangesToClientProductChanges = (changes: IServerProductChanges): IProductChanges => {
  return {
    epoch: changes.E,
    latestPrice: changes.c,
    openPrice: changes.o,
    highPrice: changes.h,
    lowPrice: changes.l,
    volume: Math.floor(changes.v), // TODO Round value
    pair: changes.s,
  };
};
