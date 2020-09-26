import { ParentMarketEnum } from "@app-core/interface";

export const SET_SEARCH_TEXT = "listFilter/SET_SEARCH_TEXT";
export const SET_ASSET_FILTER = "listFilter/SET_ASSET_FILTER";
export const ADD_FAVORITE = "listFilter/ADD_FAVORITE";
export const REMOVE_FAVORITE = "listFilter/REMOVE_FAVORITE";
export const TOGGLE_SHOW_ONLY_FAVORITS = "listFilter/TOGGLE_SHOW_ONLY_FAVORITS";

export interface IAssetFilter {
  parentMarket: ParentMarketEnum;
  quoteAsset?: string;
}

export interface IListFilterState {
  searchText: string;
  showOnlyFavorits: boolean;
  favoritsPair: Pair[];
  assetFilter?: IAssetFilter;
}

export const listFilterInitialState: IListFilterState = {
  searchText: "",
  showOnlyFavorits: false,
  favoritsPair: [],
  assetFilter: undefined,
};

export default (state = listFilterInitialState, action: any) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favoritsPair: state.favoritsPair.concat(payload.pair),
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favoritsPair: state.favoritsPair.filter((pair: Pair) => pair !== payload.pair),
      };

    case TOGGLE_SHOW_ONLY_FAVORITS:
      return {
        ...state,
        showOnlyFavorits: !state.showOnlyFavorits,
      };

    case SET_SEARCH_TEXT:
      const searchText = payload.searchText;

      return {
        ...state,
        searchText,
      };

    case SET_ASSET_FILTER:
      return {
        ...state,
        assetFilter: payload.assetFilter,
      };

    default:
      return state;
  }
};

export const setSearchText = (searchText: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SEARCH_TEXT,
      payload: {
        searchText,
      },
    });
  };
};

export const setAssetFilter = (assetFilter: IAssetFilter | undefined) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ASSET_FILTER,
      payload: {
        assetFilter,
      },
    });
  };
};

export const addFavoritePair = (pair: Pair) => {
  return (dispatch: any) => {
    dispatch({
      type: ADD_FAVORITE,
      payload: {
        pair,
      },
    });
  };
};

export const removeFavoritePair = (pair: Pair) => {
  return (dispatch: any) => {
    dispatch({
      type: REMOVE_FAVORITE,
      payload: {
        pair,
      },
    });
  };
};

export const toggleShowOnlyFavorits = () => {
  return (dispatch: any) => {
    dispatch({
      type: TOGGLE_SHOW_ONLY_FAVORITS,
    });
  };
};
