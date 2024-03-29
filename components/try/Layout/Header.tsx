import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
          {!session && (
            <>
              <span className={styles.notSignedInText}>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(event) => {
                  event.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(event) => {
                  event.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/try/auth">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/client">Client</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/server">Server</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/protected">Protected</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/api-example">API</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/admin">Admin</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/try/auth/me">Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

// export default function Header() {
//   return <div>Header</div>
// }
