import Head from 'next/head'
import Header from '../components/Header'
import WordList from '../components/WordList'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Dict</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <WordList />
    </div>
  )
}
