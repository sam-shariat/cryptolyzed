import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Overview() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cryptolyzed - Overview</title>
        <meta name="description" content="Crypto Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Overview
        </h1>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://cryptolyzed.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
