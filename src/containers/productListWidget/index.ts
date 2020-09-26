import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  loadProductList,
  setAdditionalField,
  setSortProductList,
} from "../../redux/modules/productList";
import {
  setAssetFilter,
  setSearchText,
  addFavoritePair,
  removeFavoritePair,
  toggleShowOnlyFavorits
} from "../../redux/modules/listFilter";
import { ProductListWidgetProps } from "./productListWidget.interface";
import { ProductListWidget } from "./productListWidget.component";

const mapStateToProps = (store: any) => {
  const { productList } = store;

  return {
    isLoading: productList.isLoading,
    pairMap: productList.pairMap,
    filteredList: productList.filteredList,
    additionalField: productList.additionalField,
    sortBy: productList.sortBy,
    listFilter: productList.listFilter,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      loadProductList,
      setAdditionalField,
      setSortProductList,
      setAssetFilter,
      setSearchText,
      addFavoritePair,
      removeFavoritePair,
      toggleShowOnlyFavorits,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductListWidget);
