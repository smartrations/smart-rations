import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ErrorBoundary />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
