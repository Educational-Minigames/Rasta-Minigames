import './theme/Styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, LinearProgress } from '@material-ui/core';
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

const App = ({ dir, loading }) => {
  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  const Loading = () => {
    if (loading) {
      return (
        <div style={{ width: '100%', position: 'fixed', top: '0px', zIndex: '1000' }}>
          <LinearProgress />
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  return (
    <IntlProvider translations={translations}>
      {dir === 'rtl' ? (
        <>
          <ThemeProvider theme={RTLMuiTheme}>
            <StylesProvider jss={jss}>
              <Loading />
              <MiniGameApp />
            </StylesProvider>
          </ThemeProvider>
        </>
      ) : (
          <>
            <ThemeProvider theme={MuiTheme}>
              <Loading />
              <MiniGameApp />
            </ThemeProvider>
          </>
        )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  loading: state.games.isFetching,
});

export default connect(mapStateToProps)(App);
