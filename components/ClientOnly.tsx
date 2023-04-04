import React from 'react'

function ClientOnly({ children }: { children: JSX.Element }) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted ? children : null
}

export default ClientOnly
