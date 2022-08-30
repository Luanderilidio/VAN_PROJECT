import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ptBR } from '@material-ui/core/locale';

const DefaultTheme = (mode) => ({
  breakpoints: {
    values: {
      mobile: 375,
      tablet: 600,
      laptop: 900,
      notebook: 1200,
      desktop: 1536
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'Poppins'].join(',')
  },
  palette: {
    mode,
    primary: { main: '#FFB200' },
    secundary: { main: '#277BC0' },
    striped: {
      main: '#E5E5E5'
    },
    button: {
      ...(mode === 'dark'
        ? {
            main: '#2e7d32'
          }
        : {
            main: '#2e7d32'
          })
    }
  },
  ptBR
});
const Theme = function ({ children }) {
  const darkModeTheme = createTheme(DefaultTheme('light'));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.element.isRequired
};

export default Theme;
