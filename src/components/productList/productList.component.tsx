import React from "react";
import { SortOrderEnum } from "@app-core/interface";
import { IProductListProps } from "./productList.interface";
import SearchField from "../searchField";
import {
  Favorits,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "./productList.styled";

interface IFieldConfig {
  field: string;
  title: string;
  align?: "left" | "right";
}

const FIELD_PAIR = { field: "pair", title: "Pair" };
const FIELD_CURRENT_PRICE = {
  field: "currentPrice",
  title: "Last price",
  align: "right",
};
const FIELD_VOLUME = { field: "volume", title: "Volume", align: "right" };
const FIELD_CHANGE = { field: "change", title: "Change", align: "right" };

export default class ProductList extends React.Component<IProductListProps> {
  _addFavorite: (event: React.MouseEvent<SVGElement>) => void;
  _removeFavorite: (event: React.MouseEvent<SVGElement>) => void;
  _onChangeSort: (event: React.MouseEvent<HTMLSpanElement>) => void;

  constructor(props: IProductListProps) {
    super(props);

    this._addFavorite = this.addFavorite.bind(this);
    this._removeFavorite = this.removeFavorite.bind(this);
    this._onChangeSort = this.onChangeSort.bind(this);
  }

  render() {
    const props = this.props;
    const fields = [
      // FIELD_PAIR,
      Object.assign({}, FIELD_PAIR, {
        title: `${FIELD_PAIR.title} (${props.filteredList.length})`,
      }),
      FIELD_CURRENT_PRICE,
      props.additionalField == "volume" ? FIELD_VOLUME : FIELD_CHANGE,
    ];

    return (
      <TableContainer data-e2e="product-list">
        <Table stickyHeader>
          <TableHead>
            <TableRow>{fields.map(this.getHeadField, this)}</TableRow>
          </TableHead>
          <TableBody>{props.filteredList.map(this.getProduct, this)}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  getHeadField(fieldConfig: IFieldConfig) {
    const props = this.props;
    const fieldName = fieldConfig.field;

    return (
      <TableCell key={fieldName} align={fieldConfig.align}>
        <TableSortLabel
          active={props.sortBy.field === fieldName}
          direction={props.sortBy.order === SortOrderEnum.ASC ? "asc" : "desc"}
          onClick={this._onChangeSort}
          data-field={fieldName}
        >
          {fieldConfig.title}
        </TableSortLabel>
      </TableCell>
    );
  }

  getProduct(pair: Pair) {
    const props = this.props;

    const product = props.pairMap.get(pair);

    if (!product) return;

    const key = `${product.baseAsset}_${product.quoteAsset}`;
    const isFavorite = props.favoritsPair.some((pair) => pair === product.pair);
    const className = isFavorite ? "active" : "";
    const title = [
      `parentMarket (pm): ${product.parentMarket}`,
      `parentMarketCategory (pn): ${product.parentMarketCategory}`,
    ].join("\n");

    return (
      <TableRow key={key} title={title}>
        <TableCell valign="middle">
          <Favorits
            className={className}
            onClick={isFavorite ? this._removeFavorite : this._addFavorite}
            data-pair={product.pair}
          />
          {product.baseAsset}/{product.quoteAsset}
        </TableCell>
        <TableCell align="right">{product.currentPrice}</TableCell>
        {props.additionalField == "volume" ? (
          <TableCell align="right">{product.volume}</TableCell>
        ) : (
          <TableCell className={product.change >= 0 ? "increased" : "decreased"} align="right">
            {Number(product.change).toFixed(2)}%
          </TableCell>
        )}
      </TableRow>
    );
  }

  addFavorite(event: React.MouseEvent<SVGElement>) {
    const pair = event.currentTarget.dataset.pair;

    if (pair) {
      this.props.addFavoritePair(pair);
    }
  }

  removeFavorite(event: React.MouseEvent<SVGElement>) {
    const pair = event.currentTarget.dataset.pair;

    if (pair) {
      this.props.removeFavoritePair(pair);
    }
  }

  onChangeSort(event: React.MouseEvent<HTMLSpanElement>) {
    const props = this.props;

    const fieldName = event.currentTarget.dataset?.field;
    const newSortOrder =
      props.sortBy.field === fieldName
        ? props.sortBy.order === SortOrderEnum.ASC
          ? SortOrderEnum.DESC
          : SortOrderEnum.ASC
        : SortOrderEnum.ASC;

    if (fieldName) {
      const sortBy = {
        field: fieldName,
        order: newSortOrder,
      };

      props.setSortProductList(sortBy);
    }
  }
}
