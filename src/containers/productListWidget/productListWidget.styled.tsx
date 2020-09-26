import styled from "styled-components";
import MuiGrid from "@material-ui/core/Grid";
import MuiButton from "@material-ui/core/Button";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiRadio from "@material-ui/core/Radio";
import MuiRadioGroup from "@material-ui/core/RadioGroup";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

export const Container = styled(MuiGrid)`
  display: flex;
  flex-direction: column;
  height: 700px;
  width: 550px;
`;

export const Filter = styled.div`
  display: flex;
  flex: 0;
  flex-wrap: wrap;
  align-items: spac;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Button = styled(MuiButton)`
  text-transform: none;

  &.active {
    background: #ccc;
  }
`;

export const Radio = styled(MuiRadio)``;
export const RadioGroup = styled(MuiRadioGroup)``;
export const FormControlLabel = styled(MuiFormControlLabel)``;

export const Favorits = styled(StarRoundedIcon)`
  cursor: pointer;
  color: #ccc;

  &.active {
    color: rgb(240, 185, 11);
  }
`;
