import React from 'react'

function ClientOnly({ children }: { children: JSX.Element }) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}

export default ClientOnly
