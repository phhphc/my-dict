import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../app/store'
import { Provider } from 'react-redux'

import Head from 'next/head'

import Header from '../components/Header'
import WordModal from '../components/WordModel'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>

      <Head>
        <title>My Dict</title>
        <meta name="author" content='Pham Huu Phuoc' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Component {...pageProps} />

      <WordModal />
    </Provider>
  )
}

export default MyApp
