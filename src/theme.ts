import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Anton SC' 
    },
    palette: {
        primary: {
            main: '#c52920',
            light: '#f35d55',
            dark: '#721c17'
        },
        secondary: {
            main: '#2c3e50',
            light: '#a9b1b8',
            dark: '#3e4246'
        },
    },
});

export default theme;