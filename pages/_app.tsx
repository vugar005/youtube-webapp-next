import Layout from '@/components/layout/layout';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from "../store/index";
import DarkThemeProvider from '@/providers/dark-theme-provider/dark-theme-provider';
import MiniPlayerWrapper from '@/components/mini-player-wrapper/mini-player-wrapper';
import { StyledEngineProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <DarkThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <MiniPlayerWrapper />
          </Layout>
        </DarkThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}
