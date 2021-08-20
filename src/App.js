import './theme/Styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { Slide, ToastContainer } from 'react-toastify';

import Notifier from './components/Notifications/Notifications';
import Root from './root';
import MuiTheme from './theme/MuiThemes/MuiTheme';
import RTLMuiTheme from './theme/MuiThemes/RTLMuiTheme';
import translations from './translations';
import jss from './utils/jssRTL';

const Toast = () => (
  <ToastContainer
    rtl
    position="top-right"
    autoClose={3000}
    transition={Slide}
    newestOnTop
    hideProgressBar={false}
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    closeOnClick
    limit={3}
    draggable={false}
  />
);

const MiniGameApp = () => (
  <SnackbarProvider>
    <Notifier />
    <Toast />
    <CssBaseline />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir }) => {
  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  return (
    <IntlProvider translations={translations}>
      {dir === 'rtl' ? (
        <>
          <ThemeProvider theme={RTLMuiTheme}>
            <StylesProvider jss={jss}>
              <MiniGameApp />
            </StylesProvider>
          </ThemeProvider>
        </>
      ) : (
          <>
            <ThemeProvider theme={MuiTheme}>
              <MiniGameApp />
            </ThemeProvider>
          </>
        )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
});

export default connect(mapStateToProps)(App);
