import Head from 'next/head'
import Header from '../components/Header'
import WordList from '../components/WordList'
import WordModal from '../components/WordModel'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Dict</title>
        <meta name="author" content='Pham Huu Phuoc' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <WordList />

      <WordModal />
    </div>
  )
}
