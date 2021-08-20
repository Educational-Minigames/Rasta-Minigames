import { createMuiTheme } from '@material-ui/core';

import { SummerSchool } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const MuiTheme = createMuiTheme({
  ...theme(SummerSchool),
  typography
}); 

export default MuiTheme;
