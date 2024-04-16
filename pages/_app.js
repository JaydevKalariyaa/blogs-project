import Head from "next/head";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { useRouter } from "next/router";
import Spinner from "../components/ui/spinner";
import { useEffect, useState } from "react";
import Script from "next/script";

import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {loading && <Spinner />}
        <Component {...pageProps} />
        <Script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></Script>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
