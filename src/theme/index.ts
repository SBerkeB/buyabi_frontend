import { createTheme } from '@mui/material';
import palette from './palette';
import components from './components';
import typography from './typography';

const theme = createTheme({
    components,
    palette,
    typography
});

export default theme;
