import Layout from '@/components/layout/layout';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Layout>
       <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}
