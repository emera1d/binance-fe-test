import React from "react";
import { debounce } from "@material-ui/core";
import { ParentMarketEnum } from "@app-core/interface";
import SearchField from "@components/searchField";
import ProductList from "@components/productList";
import ButtonMenu from "@components/buttonMenu";
import { ProductListWidgetProps } from "./productListWidget.interface";
import { Container, Filter, Button, Radio, RadioGroup, Favorits, FormControlLabel } from "./productListWidget.styled";

interface IAssetFilterButton {
  parentMarket: ParentMarketEnum;
  title: string;
  assets?: any[];
}

/*
  ALTS: TRX, ETH, XRP
  USD: BUSD, TUSD, USDC, USDT 
*/
const AssetsFilterList: IAssetFilterButton[] = [
  { parentMarket: ParentMarketEnum.BNB, title: "BNB" },
  { parentMarket: ParentMarketEnum.BTC, title: "BTC" },
  {
    parentMarket: ParentMarketEnum.ALTS,
    title: "ALTS",
    assets: ["TRX", "ETH", "XRP"],
  },
  {
    parentMarket: ParentMarketEnum.USD,
    title: "USD",
    assets: ["BUSD", "TUSD", "USDC", "USDT"],
  },
];

class ProductListWidget extends React.Component<ProductListWidgetProps> {
  _onChangeSearch: (ev: any) => void;

  constructor(props: ProductListWidgetProps) {
    super(props);

    this._onChangeSearch = debounce(this.onChangeSearch.bind(this), 300);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeAsset = this.onChangeAsset.bind(this);
    this.onClickAssetFilter = this.onClickAssetFilter.bind(this);
  }

  componentDidMount() {
    this.props.loadProductList();
  }

  render() {
    const props = this.props;
    const listFilter = props.listFilter;
    const assetFilter = listFilter.assetFilter;

    return (
      <Container data-e2e="product-list-widget">
        <h1>Market</h1>
        <Filter>
          <Button
            className={listFilter.showOnlyFavorits ? "active" : ""}
            onClick={props.toggleShowOnlyFavorits}
            data-e2e='btn-favorits'
          >
            <Favorits className={listFilter.showOnlyFavorits ? "active" : ""} />
          </Button>
          <Button disabled>Margin</Button>
          {AssetsFilterList.map(this.getAssetFilterButton, this)}
          <SearchField placeholder="Search" onChange={this._onChangeSearch} />
          <RadioGroup name="filter-type" value={props.additionalField} onChange={this.onChangeType} row>
            <FormControlLabel value={"volume"} control={<Radio />} label="Volume" data-e2e="btn-volume"/>
            <FormControlLabel value={"change"} control={<Radio />} label="Change" data-e2e="btn-change"/>
          </RadioGroup>
        </Filter>
        {props.isLoading ? (
          "Loading..."
        ) : (
          <ProductList
            pairMap={props.pairMap}
            filteredList={props.filteredList}
            favoritsPair={listFilter.favoritsPair}
            sortBy={props.sortBy}
            additionalField={props.additionalField}
            setSortProductList={props.setSortProductList}
            setAdditionalField={props.setAdditionalField}
            addFavoritePair={props.addFavoritePair}
            removeFavoritePair={props.removeFavoritePair}
          />
        )}
      </Container>
    );
  }

  getAssetFilterButton(button: IAssetFilterButton, index: number) {
    const props = this.props;
    const assetFilter = props.listFilter.assetFilter;

    if (button.assets) {
      const allItem = {
        text: "All",
        value: { parentMarket: button.parentMarket },
      };
      const items = button.assets.map((asset: string) => {
        const isSelected =
          assetFilter && assetFilter.parentMarket === button.parentMarket && assetFilter.quoteAsset === asset;

        return {
          text: asset,
          value: { parentMarket: button.parentMarket, quoteAsset: asset },
          selected: isSelected,
        };
      });

      return <ButtonMenu key={index} text={button.title} items={[allItem, ...items]} onChange={this.onChangeAsset} />;
    } else {
      return (
        <Button
          key={index}
          onClick={this.onClickAssetFilter}
          data-parent-market={button.parentMarket}
          className={assetFilter?.parentMarket === button.parentMarket ? "active" : ""}
        >
          {button.title}
        </Button>
      );
    }
  }

  onChangeAsset(filter: any) {
    this.changeAssetFilter(filter);
  }

  onClickAssetFilter(event: React.MouseEvent<HTMLButtonElement>) {
    const parentMarket = event.currentTarget.dataset?.parentMarket as ParentMarketEnum;
    const quoteAsset = event.currentTarget.dataset?.quoteAsset;

    const newFilter = {
      parentMarket: parentMarket,
      quoteAsset: quoteAsset,
    };

    this.changeAssetFilter(newFilter);
  }

  changeAssetFilter(filter: any) {
    const props = this.props;
    const assetFilter = props.listFilter.assetFilter;

    if (assetFilter) {
      if (assetFilter.parentMarket === filter.parentMarket && assetFilter.quoteAsset === filter.quoteAsset) {
        this.props.setAssetFilter(undefined);
      } else {
        this.props.setAssetFilter(filter);
      }
    } else {
      this.props.setAssetFilter(filter);
    }
  }

  onChangeType(event: any) {
    const field = event.target.value;

    this.props.setAdditionalField(field);
  }

  onChangeSearch(event: any) {
    const searchText = event.target.value;

    this.props.setSearchText(searchText);
  }
}

export { ProductListWidget };
