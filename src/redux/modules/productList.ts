import { SortBy, SortOrderEnum } from "@app-core/interface";
import { getProductPriceChange, serverProductToClientProduct } from "@app-core/helpers";
import listFilterReducer, {
  IAssetFilter,
  IListFilterState,
  listFilterInitialState,
  SET_SEARCH_TEXT,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  TOGGLE_SHOW_ONLY_FAVORITS,
  SET_ASSET_FILTER,
} from "./listFilter";
import { WS_CONNECT } from "./webSocket";

export const LOAD_LIST = "productList/LOAD_LIST";
export const LOAD_LIST_DONE = "productList/LOAD_LIST_DONE";
export const SORT_LIST = "productList/SORT_LIST";
export const SET_ADDITIONAL_FIELD = "productList/SET_ADDITIONAL_FIELD";
export const APPLY_CHANGES = "productList/APPLY_CHANGES";

interface IProductListState {
  isLoading: boolean;
  sortedList: Pair[];
  filteredList: Pair[];
  pairMap: ProductsMap;
  additionalField: "volume" | "change";
  sortBy: { field: string; order: SortOrderEnum };
  listFilter: IListFilterState;
}

const initialState: IProductListState = {
  isLoading: false,
  sortedList: [],
  filteredList: [],
  pairMap: new Map<Pair, IProduct>(),
  additionalField: "volume",
  sortBy: { field: "pair", order: SortOrderEnum.ASC },
  listFilter: listFilterInitialState,
};

export default (state = initialState, action: any) => {
  const type = action.type;
  const payload = action.payload;

  let filteredList;
  let sortedList;
  let pairMap: ProductsMap;
  let searchText;
  let listFilterState;

  switch (type) {
    case LOAD_LIST:
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_LIST_DONE:
      pairMap = makePairMap(payload.list);
      sortedList = Array.from(pairMap.keys());

      if (state.sortBy.field !== "") {
        sortedList = getSortedKeys(pairMap, state.sortBy);
      }

      filteredList = getFilteredKeys(sortedList, state.pairMap, state.listFilter);

      return {
        ...state,
        sortedList: sortedList,
        filteredList: filteredList,
        pairMap: pairMap,
        isLoading: false,
      };

    case SET_ADDITIONAL_FIELD:
      return {
        ...state,
        additionalField: payload.additionalField,
      };

    // TODO should check epoch
    case APPLY_CHANGES:
      pairMap = new Map<Pair, IProduct>(state.pairMap);

      payload.changes.forEach((changesItem: IProductChanges) => {
        const pair = changesItem.pair;
        const oldProduct = state.pairMap.get(pair);

        if (oldProduct) {
          const newProduct = {
            ...oldProduct,
            ...changesItem,
          };

          newProduct.change = getProductPriceChange(newProduct);
          pairMap.set(pair, newProduct);
        }
      });

      return {
        ...state,
        pairMap: pairMap,
      };

    case ADD_FAVORITE:
    case REMOVE_FAVORITE:
    case TOGGLE_SHOW_ONLY_FAVORITS:
    case SET_SEARCH_TEXT:
    case SET_ASSET_FILTER:
      const listFilterState = listFilterReducer(state.listFilter, action);

      filteredList = getFilteredKeys(state.sortedList, state.pairMap, listFilterState);

      return {
        ...state,
        filteredList: filteredList,
        listFilter: listFilterState,
      };

    case SORT_LIST:
      sortedList = getSortedKeys(state.pairMap, payload.sortBy);
      filteredList = getFilteredKeys(sortedList, state.pairMap, state.listFilter);

      return {
        ...state,
        sortedList: sortedList,
        filteredList: filteredList,
        sortBy: payload.sortBy,
      };

    default:
      return state;
  }
};

export const loadProductList = () => {
  return (dispatch: any) => {
    dispatch({
      type: LOAD_LIST,
    });

    const url = "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products";

    return fetch(url)
      .then((res) => res.json())
      .then((data: { data: IServerProduct[] }) => {
        dispatch({
          type: LOAD_LIST_DONE,
          payload: {
            list: data.data.map(serverProductToClientProduct),
          },
        });

        dispatch({
          type: WS_CONNECT,
        });
      });
  };
};

export const setSortProductList = (sortBy: SortBy) => {
  return (dispatch: any) => {
    dispatch({
      type: SORT_LIST,
      payload: {
        sortBy,
      },
    });
  };
};

export const setAdditionalField = (additionalField: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ADDITIONAL_FIELD,
      payload: {
        additionalField,
      },
    });
  };
};

export const productListChanges = (changes: IProductChanges[]) => {
  return (dispatch: any) => {
    dispatch({
      type: APPLY_CHANGES,
      payload: {
        changes,
      },
    });
  };
};

const makePairMap = (list: IProduct) => {
  const map = new Map<Pair, IProduct>();

  for (let i = 0; i < list.length; i++) {
    map.set(list[i].pair, list[i]);
  }

  return map;
};

const checkProductByFavorits = (product: IProduct, favoritsPair: Pair[]) => {
  return favoritsPair.includes(product.pair);
};

const checkProductBySearchText = (product: IProduct, searchText: string) => {
  return product.baseAsset.toLowerCase().includes(searchText) || product.quoteAsset.toLowerCase().includes(searchText);
};

const checkProductByAssetFilter = (product: IProduct, assetFilter: IAssetFilter) => {
  return (
    assetFilter.parentMarket === product.parentMarket &&
    (assetFilter.quoteAsset === undefined || assetFilter.quoteAsset === product.quoteAsset)
  );
};

const getSortedKeys = function (pairMap: ProductsMap, sortBy: SortBy) {
  const field = sortBy.field;
  const order = sortBy.order;

  const newList = Array.from(pairMap.keys()).sort((keyA, keyB) => {
    const productA = pairMap.get(keyA);
    const productB = pairMap.get(keyB);

    // @ts-ignore
    if (productA[field] < productB[field]) return order === SortOrderEnum.ASC ? -1 : 1;
    // @ts-ignore
    if (productA[field] > productB[field]) return order === SortOrderEnum.ASC ? 1 : -1;
    return 0;
  });

  return newList;
};

const getFilteredKeys = function (pairList: Pair[], pairMap: ProductsMap, listFilter: IListFilterState) {
  const searchText = listFilter.searchText.toLowerCase();
  const showOnlyFavorits = listFilter.showOnlyFavorits;
  const favoritsPair = listFilter.favoritsPair;
  const assetFilter = listFilter.assetFilter;

  if (searchText === "" && showOnlyFavorits == false && assetFilter === undefined) {
    return pairList.slice(0);
  } else {
    return pairList.filter((pair: Pair) => {
      const product = pairMap.get(pair);

      if (!product) return true;

      return (
        (showOnlyFavorits === false || checkProductByFavorits(product, favoritsPair)) &&
        (searchText === "" || checkProductBySearchText(product, searchText)) &&
        (assetFilter === undefined || checkProductByAssetFilter(product, assetFilter))
      );
    });
  }
};
