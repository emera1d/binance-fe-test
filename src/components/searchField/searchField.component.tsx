import React from "react";
import styled from "styled-components";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

const Icon = styled(SearchRoundedIcon)`
  color: #ccc;
`;

export default class SearchField extends React.Component<TextFieldProps> {
  _onChange: (ev: any) => any;

  constructor(props: TextFieldProps) {
    super(props);

    this._onChange = this.onChange.bind(this);
  }

  render() {
    const { onChange, ...props } = this.props;

    return (
      <TextField
        {...props}
        onChange={this._onChange}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
      />
    );
  }

  onChange(event: any) {
    event.persist();

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
}
