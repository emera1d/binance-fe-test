import { SortBy } from "@app-core/interface";

export interface IProductListProps {
  pairMap: ProductsMap;
  filteredList: Pair[],
  favoritsPair: Pair[];
  sortBy: SortBy
  additionalField: 'volume' | 'quoteAsset';
  setSortProductList: (sortBy: SortBy) => void;
  setAdditionalField: (additionalFiled: string) => void;
  addFavoritePair: (pair: Pair) => void;
  removeFavoritePair: (pair: Pair) => void;
}
