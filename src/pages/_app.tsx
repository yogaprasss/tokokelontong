import "@/styles/globals.css";
import Head from "next/head";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Toko Kelontong by Yoga Prasetyo</title>
        <meta name='description' content='Jual apa aja, jadi lebih mudah' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
