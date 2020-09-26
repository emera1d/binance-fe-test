import styled from "styled-components";
import MuiGrid from "@material-ui/core/Grid";
import MuiButton from "@material-ui/core/Button";
import MuiCheckbox from "@material-ui/core/Checkbox";

export const Container = styled(MuiGrid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

export const Button = styled(MuiButton)`
  text-transform: none;
  cursor: pointer;

  &.MuiButton-root {
    margin-right: 10px;
    background: #aaa;
  }

  &[disabled] {
    background: #ccc;
    color: #aaa;
    cursor: default;
  }
`;

export const Checkbox = styled(MuiCheckbox)``;
