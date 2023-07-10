import Layout from '@/components/layout/layout';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';
import { MUI_THEME } from './theme';
import { ThemeProvider } from '@emotion/react';

export default function App({ Component, pageProps }: AppProps) {
  const muiTheme = MUI_THEME;

  return (
    <Fragment>
    <ThemeProvider theme={muiTheme}>
      <Layout>
       <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    </Fragment>
  );
}
