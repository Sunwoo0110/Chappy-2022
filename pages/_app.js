import '../styles/globals.css'
// import '../styles/_leftsidebar.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
