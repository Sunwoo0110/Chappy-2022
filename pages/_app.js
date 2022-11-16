import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect } from 'react';
import { wrapper } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const store = useStore((state) => state);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

 useEffect(() => {
   typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
 }, []);
  return(
    <>
    {/* <PersistGate persistor={store.__persistor} loading={<div>loading...</div>}>
      <Component {...pageProps} />
    </PersistGate> */}
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
    </>
  ) 
}

export default wrapper.withRedux(MyApp);
