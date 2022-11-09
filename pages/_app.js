import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect } from 'react';
import { wrapper } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

 useEffect(() => {
   typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
 }, []);
  return(
    <PersistGate persistor={store.__persistor} loading={<div>loading...</div>}>
      <Component {...pageProps} />
    </PersistGate>
  ) 
}

export default wrapper.withRedux(MyApp);
