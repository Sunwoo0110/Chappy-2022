import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect } from 'react';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

 useEffect(() => {
   typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
 }, []);
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
