import styled from "styled-components";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import MuiTable from "@material-ui/core/Table";
import MuiTableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTableContainer from "@material-ui/core/TableContainer";
import MuiTableHead from "@material-ui/core/TableHead";
import MuiTableRow from "@material-ui/core/TableRow";
import MuiTableSortLabel from "@material-ui/core/TableSortLabel";

export const Favorits = styled(StarRoundedIcon)`
  cursor: pointer;
  color: #ccc;

  &.active {
    color: rgb(240, 185, 11);
  }
`;

export const Table = styled(MuiTable)``;
export const TableBody = styled(MuiTableBody)``;
export const TableCell = styled(MuiTableCell)`
  &.MuiTableCell-root {
    padding: 2px;
  }

  &.increased {
    color: green;
  }
  &.decreased {
    color: red;
  }
`;
export const TableContainer = styled(MuiTableContainer)``;
export const TableHead = styled(MuiTableHead)``;
export const TableRow = styled(MuiTableRow)``;
export const TableSortLabel = styled(MuiTableSortLabel)``;
