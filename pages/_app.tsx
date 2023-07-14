import Layout from '@/components/layout/layout';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { MUI_THEME } from './theme';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from "../store/index";

export default function App({ Component, pageProps }: AppProps) {
  const muiTheme = MUI_THEME;

  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}
