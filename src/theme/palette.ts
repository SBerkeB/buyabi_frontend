import { PaletteColor, PaletteColorOptions, PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: PaletteColor;
    }

    interface PaletteOptions {
        tertiary?: PaletteColorOptions;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        tertiary: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
    }
}

declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        tertiary: true;
    }
}

const palette: PaletteOptions = {
    primary: {
        light: '#24b9c1',
        main: '#1a848a',
        dark: '#0c3e40',
        contrastText: '#fff'
    },

    secondary: {
        light: '#707475',
        main: '#343434',
        dark: '#252727',
        contrastText: '#fff'
    },

    tertiary: {
        main: '#ffffff'
    }
}

export default palette;