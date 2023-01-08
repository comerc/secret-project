// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '.../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing <code className={styles.code}>pages/index.tsx</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }

// function HomePage() {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         color: 'black',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'center',
//       }}
//     >
//       HomePage
//     </div>
//   )
// }

// export default HomePage

import React from 'react'
import { Progress, Space } from 'antd'
import pluralize from '.../utils/pluralize'

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/countdown')
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

function HomePage({ data: { diff, now, final } }) {
  const percent = diff > 0 ? 0 : Math.abs(diff)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return (
    <div className="flex h-screen items-center justify-center">
      <Space direction="vertical" align="center">
        <Progress
          type="circle"
          percent={percent}
          format={(percent) => pluralize(percent, ['день', 'дня', 'дней'])}
        />
        <div>{`Now: ${new Date(now).toLocaleDateString('ru-RU', options)}`}</div>
        <div>{`Final: ${new Date(final).toLocaleDateString('ru-RU', options)}`}</div>
      </Space>
    </div>
  )
}

export default HomePage
