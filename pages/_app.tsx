import Layout from '@/components/layout/layout';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from "../store/index";
import DarkThemeProvider from '@/providers/dark-theme-provider/dark-theme-provider';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <DarkThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DarkThemeProvider>
    </Provider>
  );
}
