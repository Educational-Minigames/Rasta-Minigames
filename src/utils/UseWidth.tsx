import {
  Breakpoint,
  Theme,
  useTheme,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export default useWidth;
