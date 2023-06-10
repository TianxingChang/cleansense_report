import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './styles/page.module.css'
import dynamic from 'next/dynamic';
import SearchBar from './components/SearchBar';
import { useClient } from 'next/dynamic';
import CardZone from './components/CardZone';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const isClient = useClient();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          CleanSense&nbsp;
          <code className={styles.code}>Toilet finder</code>
        </p>
        {/* {isClient && <SearchBar onSearch={handleSearch} />} */}
        {/* <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      <CardZone></CardZone>

      <div className={styles.headBar}>
        <h1 className={inter.className}>Toilets nearby:</h1>
      </div>
      {/* <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            LG1_02 <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            G_01 <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            G_02 <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>

      
    </main>
  )
}
