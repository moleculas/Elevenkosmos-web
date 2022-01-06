import { createTheme } from "@material-ui/core/styles";
//import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import themeData from "./theme.json";

const themeName = 'Elevenkosmos theme';
export default createTheme({ ...themeData, themeName });