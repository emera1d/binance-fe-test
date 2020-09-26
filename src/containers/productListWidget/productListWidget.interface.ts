import { SortBy } from "@app-core/interface";
import { IListFilterState, IAssetFilter } from "../../redux/modules/listFilter";

export interface ProductListWidgetProps {
  isLoading: boolean;
  pairMap: ProductsMap;
  filteredList: Pair[];
  additionalField: 'volume' | 'quoteAsset';
  sortBy: SortBy;
  listFilter: IListFilterState
  loadProductList: () => void;
  setAdditionalField: (additionalFiled: string) => void;
  setSortProductList: (sortBy: SortBy) => void;
  setAssetFilter: (assetFilter: IAssetFilter | undefined) => void;
  setSearchText: (searchText: string) => void;
  addFavoritePair: (pair: Pair) => void;
  removeFavoritePair: (pair: Pair) => void;
  toggleShowOnlyFavorits: () => void;
}
