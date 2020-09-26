import React from "react";
import { Button, Icon, Menu, MenuItem } from "./buttonMenu.styled";

interface ButtonMenuItem {
  text: string;
  value: any;
  selected?: boolean;
}

interface IButtonMenuProps {
  text: string;
  items: ButtonMenuItem[];
  onChange: (item: any) => void;
}

interface IButtonMenuState {
  opened: boolean;
}

export default class ButtonMenu extends React.Component<IButtonMenuProps, IButtonMenuState> {
  buttonAnchorEl: any;

  constructor(props: IButtonMenuProps) {
    super(props);

    this.state = {
      opened: false,
    };

    this.buttonAnchorEl = React.createRef();
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  render() {
    const props = this.props;

    return (
      <>
        <Button onClick={this.onOpen} ref={this.buttonAnchorEl}>
          {props.text} <Icon />
        </Button>
        <Menu anchorEl={this.buttonAnchorEl.current} keepMounted open={this.state.opened} onClose={this.onClose}>
          {props.items.map(this.getItem, this)}
        </Menu>
      </>
    );
  }

  getItem(item: any, index: number) {
    return (
      <MenuItem key={index} data-index={index} onClick={this.onSelect}>
        {item.text}
      </MenuItem>
    );
  }

  onOpen() {
    this.setState({
      opened: true,
    });
  }

  onClose() {
    this.setState({
      opened: false,
    });
  }

  onSelect(ev: React.MouseEvent<HTMLLIElement>) {
    const index = ev.currentTarget.dataset.index;

    this.onClose();

    if (index) {
      let n = Number(index);
      this.props.onChange(this.props.items[n].value);
    }
  }
}
